import type { Metadata } from "next";

export const SITE_URL = "https://www.fabianozaffalon.com.br";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
