import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fabianozaffalon.com.br";

// Imagem estática em src/app/opengraph-image.png (convenção de arquivo do Next.js).
// Precisa ser referenciada explicitamente aqui porque o merge de metadata do Next.js é raso:
// toda página que define seu próprio `openGraph` substitui por completo o objeto herdado do
// layout raiz (ver https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging).
const DEFAULT_OG_IMAGE = { url: `${SITE_URL}/opengraph-image.png`, width: 1200, height: 630 };

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** true para rotas que têm seu próprio opengraph-image.tsx no mesmo segmento (ex: cases/[slug]). */
  hasOwnOgImage?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  hasOwnOgImage = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      ...(hasOwnOgImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(hasOwnOgImage ? {} : { images: [DEFAULT_OG_IMAGE.url] }),
    },
  };
}
