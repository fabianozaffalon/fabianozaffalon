import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extrai o public_id do Cloudinary a partir da URL
function extractPublicId(url: string): string | null {
  try {
    // Ex: https://res.cloudinary.com/dlqvozq7z/image/upload/v123/ofertas/abc.jpg
    // → ofertas/abc
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

// ── Tarefa 1: Renova token do Instagram ──────────────────────────────────────

async function renovarTokenInstagram(): Promise<string> {
  const appId        = process.env.FACEBOOK_APP_ID;
  const appSecret    = process.env.FACEBOOK_APP_SECRET;
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const vercelToken  = process.env.VERCEL_API_TOKEN;
  const projectId    = process.env.VERCEL_PROJECT_ID;

  if (!appId || !appSecret || !currentToken) {
    return "Instagram: variáveis de ambiente faltando — pulado";
  }

  try {
    // 1. Renova o token via Meta Graph API
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${currentToken}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.access_token) {
      return `Instagram: falha na renovação — ${JSON.stringify(data)}`;
    }

    const diasRestantes = Math.round(data.expires_in / 86400);
    console.log("[cron] Novo token Instagram gerado, expira em", data.expires_in, "segundos");

    // 2. Salva automaticamente na Vercel, se as variáveis estiverem disponíveis
    if (!vercelToken || !projectId) {
      console.warn("[cron] VERCEL_API_TOKEN ou VERCEL_PROJECT_ID ausentes — atualização manual necessária");
      return `Instagram: token renovado (expira em ${diasRestantes} dias) — atualização manual necessária`;
    }

    try {
      // 2a. Busca o ID da env var INSTAGRAM_ACCESS_TOKEN
      const listRes = await fetch(
        `https://api.vercel.com/v9/projects/${projectId}/env`,
        { headers: { Authorization: `Bearer ${vercelToken}` } }
      );
      const listData = await listRes.json();

      if (!listRes.ok) {
        throw new Error(`Vercel list env falhou: ${JSON.stringify(listData)}`);
      }

      const envVar = (listData.envs as Array<{ id: string; key: string }>)
        ?.find((e) => e.key === "INSTAGRAM_ACCESS_TOKEN");

      if (!envVar) {
        throw new Error("INSTAGRAM_ACCESS_TOKEN não encontrada no projeto Vercel");
      }

      // 2b. Atualiza o valor via PATCH
      const patchRes = await fetch(
        `https://api.vercel.com/v9/projects/${projectId}/env/${envVar.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: data.access_token }),
        }
      );

      if (!patchRes.ok) {
        const patchData = await patchRes.json();
        throw new Error(`Vercel PATCH falhou: ${JSON.stringify(patchData)}`);
      }

      console.log("[cron] Token Instagram salvo automaticamente na Vercel");
      // Cast necessário: em Next.js 16, o tipo de revalidateTag exige 2 args para o
      // sistema "use cache", mas para o Data Cache ISR (fetch tags) 1 arg é suficiente.
      (revalidateTag as (tag: string) => void)("instagram");
      console.log("[cron] Cache do Instagram invalidado após renovação do token");
      return `Instagram: token renovado e salvo automaticamente (expira em ${diasRestantes} dias)`;
    } catch (vercelErr) {
      console.error("[cron] Falha ao salvar token na Vercel:", vercelErr);
      return `Instagram: token renovado (expira em ${diasRestantes} dias) — falha ao salvar na Vercel, atualização manual necessária`;
    }
  } catch (err) {
    return `Instagram: erro inesperado — ${err}`;
  }
}

// ── Tarefa 2: Apaga ofertas vencidas ─────────────────────────────────────────

async function apagarOfertasVencidas(): Promise<string> {
  try {
    const agora = new Date();

    // Busca ofertas com validade definida e já vencida
    const vencidas = await prisma.oferta.findMany({
      where: {
        validade: { not: null, lt: agora },
      },
      select: { id: true, titulo: true, imagem: true },
    });

    if (vencidas.length === 0) {
      return "Ofertas: nenhuma vencida encontrada";
    }

    let apagadas = 0;
    let erros    = 0;

    for (const oferta of vencidas) {
      try {
        // 1. Apaga imagem no Cloudinary
        const publicId = extractPublicId(oferta.imagem);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }

        // 2. Apaga registro no banco
        await prisma.oferta.delete({ where: { id: oferta.id } });
        apagadas++;
        console.log(`[cron] Oferta apagada: "${oferta.titulo}" (${oferta.id})`);
      } catch (err) {
        erros++;
        console.error(`[cron] Erro ao apagar oferta ${oferta.id}:`, err);
      }
    }

    return `Ofertas: ${apagadas} apagadas, ${erros} erros`;
  } catch (err) {
    return `Ofertas: erro inesperado — ${err}`;
  }
}

// ── Handler principal ─────────────────────────────────────────────────────────

export async function GET(req: Request) {
  // Proteção — só aceita chamadas do Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  console.log("[cron] Iniciando jobs:", new Date().toISOString());

  const [resultadoInstagram, resultadoOfertas] = await Promise.allSettled([
    renovarTokenInstagram(),
    apagarOfertasVencidas(),
  ]);

  const resultado = {
    timestamp: new Date().toISOString(),
    instagram: resultadoInstagram.status === "fulfilled"
      ? resultadoInstagram.value
      : `Erro: ${resultadoInstagram.reason}`,
    ofertas: resultadoOfertas.status === "fulfilled"
      ? resultadoOfertas.value
      : `Erro: ${resultadoOfertas.reason}`,
  };

  console.log("[cron] Resultado:", resultado);
  return NextResponse.json(resultado);
}
