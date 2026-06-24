import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NoticiasHero } from "@/components/sections/noticias/NoticiasHero";
import { NewsletterCompact } from "@/components/sections/noticias/NewsletterCompact";
import { CarrosselFotos } from "@/components/sections/noticias/CarrosselFotos";
import { buildMetadata } from "@/lib/seo";

function formatarData(date: Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const noticias = await prisma.noticia.findMany({
    where: { publicada: true },
    select: { slug: true },
  });
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { slug } });
  if (!noticia) return { title: "Notícia não encontrada", robots: { index: false, follow: false } };
  return buildMetadata({
    title: noticia.titulo,
    description: noticia.resumo,
    path: `/noticias/${noticia.slug}`,
    type: "article",
  });
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Busca notícia atual
  const noticia = await prisma.noticia.findUnique({ where: { slug } });
  if (!noticia) notFound();

  // Busca todas as publicadas ordenadas por data (mais nova primeiro)
  const todas = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      categoria: true,
      titulo: true,
      capa: true,
      createdAt: true,
    },
  });

  // Encontra posição da notícia atual
  const idx = todas.findIndex((n) => n.slug === slug);

  // Lógica dos 3 cards da sidebar
  let sidebar: typeof todas = [];
  if (todas.length <= 3) {
    // Menos de 3 notícias — mostra todas
    sidebar = todas;
  } else if (idx === 0) {
    // É a mais nova — mostra ela + 2 próximas
    sidebar = todas.slice(0, 3);
  } else if (idx === todas.length - 1) {
    // É a mais antiga — mostra 2 anteriores + ela
    sidebar = todas.slice(-3);
  } else {
    // Caso normal — anterior + atual + próxima
    sidebar = todas.slice(idx - 1, idx + 2);
  }

  return (
    <>
      <NoticiasHero />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px] md:items-start md:gap-12">
            {/* ── Artigo — esquerda ── */}
            <article>
              {/* Categoria */}
              <p className="text-xs font-bold uppercase tracking-wider text-[#006EB7]">
                {noticia.categoria}
              </p>

              {/* Título */}
              <h1
                className="mt-2 font-black leading-tight text-[#00497F]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {noticia.titulo}
              </h1>

              {/* Divisor */}
              <div
                className="mt-3 rounded-full bg-[#006EB7]"
                style={{ width: "77px", height: "6px" }}
              />

              {/* Data */}
              <p className="mt-2 text-xs text-[#BCBABA]">
                {formatarData(noticia.createdAt)}
              </p>

              {/* Foto capa */}
              <div
                className="relative mt-5 w-full overflow-hidden rounded-[12px]"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={noticia.capa}
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Conteúdo */}
              <div className="mt-6 flex flex-col gap-4">
                {noticia.conteudo.split("\n\n").map((paragrafo, i) => (
                  <p key={i} className="text-sm leading-relaxed text-[#595959]">
                    {paragrafo}
                  </p>
                ))}
              </div>

              {/* Carrossel de fotos extras */}
              {noticia.fotos.length > 0 && (
                <CarrosselFotos fotos={noticia.fotos} titulo={noticia.titulo} />
              )}

              {/* Voltar */}
              <Link
                href="/noticias"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#006EB7] hover:underline"
              >
                ← Voltar às notícias
              </Link>
            </article>

            {/* ── Sidebar — direita ── */}
            <aside className="sticky top-28 flex flex-col gap-5">
              <h2 className="text-center text-base font-semibold text-[#595959]">
                Outras notícias
              </h2>

              {/* 3 cards fixos */}
              <div className="flex flex-col gap-4">
                {sidebar.map((n) => {
                  const isAtual = n.slug === slug;
                  return (
                    <Link
                      key={n.id}
                      href={`/noticias/${n.slug}`}
                      className={
                        "group relative block overflow-hidden rounded-[12px] " +
                        (isAtual ? "pointer-events-none" : "")
                      }
                    >
                      <div
                        className="relative w-full"
                        style={{ height: "190px" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={n.capa}
                          alt={n.titulo}
                          style={{
                            width: "100%",
                            height: "190px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {/* Overlay base */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                          }}
                        />
                        {/* Overlay azul se for a notícia atual */}
                        {isAtual && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0, 73, 127, 0.45)",
                            }}
                          />
                        )}
                        {/* Badge "Lendo agora" */}
                        {isAtual && (
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              background: "#006EB7",
                              color: "white",
                              fontSize: "10px",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "999px",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                            }}
                          >
                            Lendo agora
                          </div>
                        )}
                        {/* Texto */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "14px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "13px",
                              fontWeight: 600,
                              lineHeight: 1.4,
                              margin: 0,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {n.titulo}
                          </p>
                          {!isAtual && (
                            <span
                              style={{
                                color: "white",
                                fontSize: "11px",
                                fontWeight: 700,
                                textDecoration: "underline",
                                marginTop: "6px",
                                display: "inline-block",
                              }}
                            >
                              Saiba mais
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Botão ver todas */}
              <Link
                href="/noticias"
                className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-[#006EB7] px-4 py-2.5 text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#006EB7] hover:text-white"
              >
                Ver todas as notícias
              </Link>

              {/* Newsletter compacta */}
              <NewsletterCompact />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
