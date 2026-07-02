import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatarData(date: Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function NoticiasList() {
  const noticias = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      categoria: true,
      titulo: true,
      resumo: true,
      capa: true,
      createdAt: true,
    },
  });

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        {noticias.length === 0 ? (
          <p className="text-center text-sm text-[#BCBABA]">
            Nenhuma notícia publicada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n, index) => (
              <Link
                key={n.id}
                href={`/noticias/${n.slug}`}
                className="group relative block overflow-hidden rounded-[16px]"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={n.capa}
                    alt={n.titulo}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 3 ? "eager" : "lazy"}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-sm font-semibold leading-snug text-white line-clamp-3">
                      {n.titulo}
                    </h2>
                    <span className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-2">
                      Saiba mais
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
