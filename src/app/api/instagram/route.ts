import { NextResponse } from "next/server";

export type InstagramPost = {
  id: string;
  caption: string | null;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

// Cache de 1 hora — evita exceder rate limit da Meta
export const revalidate = 300;

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessId = process.env.INSTAGRAM_BUSINESS_ID;

  // Sem credenciais configuradas — retorna vazio
  if (!token || !businessId) {
    console.error(
      "[api/instagram] variáveis de ambiente faltando (INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ID) — retornando vazio"
    );
    return NextResponse.json({ posts: [] });
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.facebook.com/v21.0/${businessId}/media?fields=${fields}&limit=9&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 300, tags: ["instagram"] } });

    if (!res.ok) {
      // Token expirado ou erro da API — não quebra o site
      console.error("Instagram API error:", await res.text());
      return NextResponse.json({ posts: [] });
    }

    const data = await res.json();
    const posts: InstagramPost[] = data.data ?? [];

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Instagram fetch failed:", error);
    return NextResponse.json({ posts: [] });
  }
}
