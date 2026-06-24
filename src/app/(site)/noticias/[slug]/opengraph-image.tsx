import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { OG_SIZE, OG_CONTENT_TYPE, ArticleOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { slug } });

  return new ImageResponse(
    <ArticleOgImage title={noticia?.titulo ?? "Fabiano Zaffalon Distribuidora"} imageUrl={noticia?.capa} />,
    size
  );
}
