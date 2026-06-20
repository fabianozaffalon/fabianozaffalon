import { NextResponse } from "next/server";

// Roda automaticamente via Vercel Cron — ver vercel.json
// Renova o token do Instagram antes que expire (válido por ~60 dias)
export async function GET(req: Request) {
  // Proteção — só aceita chamadas do Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!appId || !appSecret || !currentToken) {
    return NextResponse.json({ error: "Variáveis de ambiente faltando" }, { status: 500 });
  }

  try {
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${currentToken}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.access_token) {
      console.error("Falha ao renovar token Instagram:", data);
      return NextResponse.json({ error: "Falha na renovação", details: data }, { status: 500 });
    }

    // IMPORTANTE: Atualiza a variável de ambiente no Vercel via API
    // Isso requer a Vercel API com token de projeto — ver instruções no README
    // Por enquanto, loga o novo token para atualização manual se a API do Vercel não estiver configurada
    console.log("Novo token gerado (válido por", data.expires_in, "segundos):", data.access_token);

    return NextResponse.json({
      success: true,
      expires_in: data.expires_in,
      message: "Token renovado. Verifique os logs para atualizar a variável de ambiente caso a automação completa não esteja configurada.",
    });
  } catch (error) {
    console.error("Erro ao renovar token:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
