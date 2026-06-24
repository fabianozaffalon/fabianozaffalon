import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { OG_SIZE, OG_CONTENT_TYPE, ArticleOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const case_ = await prisma.case.findUnique({ where: { slug } });

  return new ImageResponse(
    <ArticleOgImage title={case_?.titulo ?? "Fabiano Zaffalon Distribuidora"} imageUrl={case_?.capa} />,
    size
  );
}
