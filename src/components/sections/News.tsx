import { prisma } from "@/lib/prisma";
import { NewsCarrossel } from "./NewsCarrossel";
import { InstagramFeed } from "@/components/sections/instagram/InstagramFeed";

export async function News() {
  const noticias = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      slug: true,
      titulo: true,
      capa: true,
    },
  });

  const items = noticias.map((n) => ({
    id:    n.id,
    image: n.capa,
    title: n.titulo,
    href:  `/noticias/${n.slug}`,
  }));

  return <NewsCarrossel items={items} instagramSlot={<InstagramFeed limit={2} />} />;
}
