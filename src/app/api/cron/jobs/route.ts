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
//
// FLUXO CORRETO DE TOKEN — nunca usar o token direto do Graph API Explorer em
// produção, ele herda a expiração curta da sessão de User Token do Explorer:
//
//   1. Gere manualmente, uma única vez, um User Access Token com as permissões
//      pages_show_list, instagram_basic, pages_read_engagement.
//   2. Troque esse User Token por um de LONGA DURAÇÃO (~60 dias) via
//      GET /oauth/access_token?grant_type=fb_exchange_token&...
//   3. Salve o resultado em FACEBOOK_USER_ACCESS_TOKEN — é a "semente".
//   4. Este cron, a cada execução:
//      a) renova FACEBOOK_USER_ACCESS_TOKEN (repete o exchange, adiando a expiração)
//      b) deriva o PAGE ACCESS TOKEN a partir dele via
//         GET /{FACEBOOK_PAGE_ID}?fields=access_token&access_token={user_token}
//      c) salva o resultado em INSTAGRAM_ACCESS_TOKEN (o que /api/instagram consome)
//
// O Page Token derivado de um User Token de longa duração não expira enquanto
// o usuário mantiver o cargo/permissões na página.

async function salvarEnvVarsNaVercel(
  vercelToken: string,
  projectId: string,
  updates: Record<string, string>
): Promise<void> {
  const listRes = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env`,
    { headers: { Authorization: `Bearer ${vercelToken}` } }
  );
  const listData = await listRes.json();

  if (!listRes.ok) {
    throw new Error(`Vercel list env falhou: ${JSON.stringify(listData)}`);
  }

  const envs = listData.envs as Array<{ id: string; key: string }>;

  for (const [key, value] of Object.entries(updates)) {
    const envVar = envs?.find((e) => e.key === key);
    if (!envVar) {
      throw new Error(`${key} não encontrada no projeto Vercel`);
    }

    const patchRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env/${envVar.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      }
    );

    if (!patchRes.ok) {
      const patchData = await patchRes.json();
      throw new Error(`Vercel PATCH falhou (${key}): ${JSON.stringify(patchData)}`);
    }

    console.log(`[cron][instagram] ${key} atualizado na Vercel`);
  }
}

async function renovarTokenInstagram(): Promise<string> {
  const appId     = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const userToken = process.env.FACEBOOK_USER_ACCESS_TOKEN;
  const pageId    = process.env.FACEBOOK_PAGE_ID;
  const vercelToken = process.env.VERCEL_API_TOKEN;
  const projectId   = process.env.VERCEL_PROJECT_ID;

  if (!appId || !appSecret || !userToken || !pageId) {
    console.error(
      "[cron][instagram] variáveis de ambiente faltando (FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_USER_ACCESS_TOKEN, FACEBOOK_PAGE_ID) — pulado"
    );
    return "Instagram: variáveis de ambiente faltando — pulado";
  }

  try {
    // 1. Renova o USER TOKEN de longa duração (semente)
    const exchangeUrl = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${userToken}`;
    const exchangeRes  = await fetch(exchangeUrl);
    const exchangeData = await exchangeRes.json();

    if (!exchangeRes.ok || !exchangeData.access_token) {
      console.error("[cron][instagram] falha ao renovar user token:", exchangeData);
      return `Instagram: falha na renovação do user token — ${JSON.stringify(exchangeData)}`;
    }

    const novoUserToken = exchangeData.access_token as string;
    console.log("[cron][instagram] user token renovado, expira em", exchangeData.expires_in, "segundos");

    // 2. Deriva o PAGE ACCESS TOKEN a partir do user token renovado
    const pageUrl  = `https://graph.facebook.com/v21.0/${pageId}?fields=access_token&access_token=${novoUserToken}`;
    const pageRes  = await fetch(pageUrl);
    const pageData = await pageRes.json();

    if (!pageRes.ok || !pageData.access_token) {
      console.error("[cron][instagram] falha ao derivar page token:", pageData);
      return `Instagram: falha ao derivar Page Token — ${JSON.stringify(pageData)}`;
    }

    const novoPageToken = pageData.access_token as string;
    console.log("[cron][instagram] Page Access Token derivado com sucesso");

    // 3. Salva os dois valores na Vercel, se as variáveis estiverem disponíveis
    if (!vercelToken || !projectId) {
      console.warn("[cron][instagram] VERCEL_API_TOKEN ou VERCEL_PROJECT_ID ausentes — atualização manual necessária");
      return "Instagram: tokens renovados — atualização manual necessária (Vercel API não configurada)";
    }

    try {
      await salvarEnvVarsNaVercel(vercelToken, projectId, {
        FACEBOOK_USER_ACCESS_TOKEN: novoUserToken,
        INSTAGRAM_ACCESS_TOKEN: novoPageToken,
      });

      console.log("[cron][instagram] tokens salvos automaticamente na Vercel");
      // Cast necessário: em Next.js 16, o tipo de revalidateTag exige 2 args para o
      // sistema "use cache", mas para o Data Cache ISR (fetch tags) 1 arg é suficiente.
      (revalidateTag as (tag: string) => void)("instagram");
      console.log("[cron][instagram] cache do Instagram invalidado após renovação do token");
      return "Instagram: Page Token renovado e salvo automaticamente";
    } catch (vercelErr) {
      console.error("[cron][instagram] falha ao salvar tokens na Vercel:", vercelErr);
      return `Instagram: tokens renovados — falha ao salvar na Vercel, atualização manual necessária (${vercelErr})`;
    }
  } catch (err) {
    console.error("[cron][instagram] erro inesperado:", err);
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
