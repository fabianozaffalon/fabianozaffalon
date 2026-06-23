import { NextResponse } from "next/server";
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
  const appId       = process.env.FACEBOOK_APP_ID;
  const appSecret   = process.env.FACEBOOK_APP_SECRET;
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!appId || !appSecret || !currentToken) {
    return "Instagram: variáveis de ambiente faltando — pulado";
  }

  try {
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${currentToken}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.access_token) {
      return `Instagram: falha na renovação — ${JSON.stringify(data)}`;
    }

    // Loga o novo token para atualização manual se necessário
    console.log("[cron] Novo token Instagram gerado, expira em", data.expires_in, "segundos");
    return `Instagram: token renovado (expira em ${Math.round(data.expires_in / 86400)} dias)`;
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
