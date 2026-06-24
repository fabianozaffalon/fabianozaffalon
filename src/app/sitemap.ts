import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/empresa", changeFrequency: "monthly", priority: 0.8 },
  { path: "/varejo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/foodservice", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industria", changeFrequency: "monthly", priority: 0.8 },
  { path: "/catalogo", changeFrequency: "weekly", priority: 0.7 },
  { path: "/cases", changeFrequency: "weekly", priority: 0.6 },
  { path: "/noticias", changeFrequency: "daily", priority: 0.7 },
  { path: "/ofertas", changeFrequency: "daily", priority: 0.7 },
  { path: "/contato", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", changeFrequency: "yearly", priority: 0.4 },
  { path: "/broker-nestle", changeFrequency: "monthly", priority: 0.6 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.2 },
  { path: "/termos-de-servico", changeFrequency: "yearly", priority: 0.2 },
  { path: "/exclusao-de-dados", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cases, noticias] = await Promise.all([
    prisma.case.findMany({ where: { ativo: true }, select: { slug: true, updatedAt: true } }),
    prisma.noticia.findMany({ where: { publicada: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const noticiaEntries: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...caseEntries, ...noticiaEntries];
}
