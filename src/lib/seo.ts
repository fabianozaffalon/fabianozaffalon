import type { Metadata } from "next";

// TODO: trocar para "https://www.fabianozaffalon.com.br" quando o domínio entrar no ar.
export const SITE_URL = "https://fabianozaffalon.vercel.app";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
