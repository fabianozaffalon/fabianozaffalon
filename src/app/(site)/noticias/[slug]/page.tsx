import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NOTICIAS, getNoticiaBySlug, formatarData } from "@/data/noticias";

// Gera rotas estáticas para todos os slugs
export function generateStaticParams() {
  return NOTICIAS.map((n) => ({ slug: n.slug }));
}

// Metadata dinâmica por notícia
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const noticia = getNoticiaBySlug(params.slug);
  if (!noticia) return { title: "Notícia não encontrada" };
  return {
    title: noticia.titulo,
    description: noticia.resumo,
  };
}

export default function NoticiaPage({ params }: { params: { slug: string } }) {
  const noticia = getNoticiaBySlug(params.slug);
  if (!noticia) notFound();

  const outras = NOTICIAS.filter((n) => n.slug !== noticia.slug).slice(0, 3);

  return (
    <main className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px] md:items-start md:gap-12">

          {/* Artigo */}
          <article>
            <nav className="mb-6 flex items-center gap-2 text-xs text-[#BCBABA]">
              <Link href="/" className="hover:text-[#006EB7] transition-colors">Home</Link>
              <span>›</span>
              <Link href="/noticias" className="hover:text-[#006EB7] transition-colors">Notícias</Link>
              <span>›</span>
              <span className="text-[#595959]">{noticia.titulo}</span>
            </nav>

            <p className="text-xs font-bold uppercase tracking-wider text-[#F47920]">
              {noticia.categoria}
            </p>

            <h1
              className="mt-2 font-black leading-tight text-[#00497F]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {noticia.titulo}
            </h1>

            <div className="mt-3 rounded-full bg-[#006EB7]" style={{ width: "77px", height: "6px" }} />
            <p className="mt-3 text-xs text-[#BCBABA]">{formatarData(noticia.data)}</p>

            {/* Fotos */}
            <div className="mt-5 flex flex-col gap-4">
              {noticia.fotos.map((foto, i) => (
                <div key={i} className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={foto}
                    alt={`${noticia.titulo} — foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            {/* Conteúdo */}
            <div className="mt-6 flex flex-col gap-4">
              {noticia.conteudo.split("\n\n").map((paragrafo, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#595959]">
                  {paragrafo}
                </p>
              ))}
            </div>

            <Link
              href="/noticias"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#006EB7] hover:underline"
            >
              ← Ver todas as notícias
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="sticky top-28 flex flex-col gap-5">
            <h2 className="text-center text-base font-semibold text-[#595959]">
              Outras notícias
            </h2>
            <div className="flex flex-col gap-4">
              {outras.map((n) => (
                <Link
                  key={n.id}
                  href={`/noticias/${n.slug}`}
                  className="group relative block overflow-hidden rounded-[12px]"
                >
                  <div className="relative w-full" style={{ aspectRatio: "351/180" }}>
                    <Image
                      src={n.capa}
                      alt={n.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-sm font-semibold leading-snug text-white">{n.titulo}</h3>
                      <span className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-2">
                        Saiba mais
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
