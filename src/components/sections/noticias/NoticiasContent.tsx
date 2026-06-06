"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NOTICIAS, formatarData, type Noticia } from "@/data/noticias";

const NOTICIAS_POR_PAGINA = 1;

// ── Card pequeno da sidebar ───────────────────────────────────────────────────
function CardSidebar({ noticia }: { noticia: Noticia }) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="group relative block overflow-hidden rounded-[12px]"
    >
      <div className="relative w-full" style={{ aspectRatio: "351/180" }}>
        <Image
          src={noticia.capa}
          alt={noticia.titulo}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-semibold leading-snug text-white">
            {noticia.titulo}
          </h3>
          <span className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-2">
            Saiba mais
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <div className="rounded-[12px] bg-[#F6F6F6] p-5">
      <p className="text-sm font-bold text-[#006EB7]">Receba nossas notícias</p>
      <p className="mt-1 text-xs text-[#595959]">
        Cadastre-se e receba nossas novidade em primeira mão.
      </p>
      <div className="mt-3 flex overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none"
        />
        <button
          className="flex items-center gap-1.5 bg-[#006EB7] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#00497F]"
        >
          Cadastrar
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Paginação ─────────────────────────────────────────────────────────────────
function Paginacao({ current, total, onChange }: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      {/* Anterior */}
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ‹
      </button>

      {/* Números */}
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={
            "flex h-8 w-8 items-center justify-center rounded border text-sm font-medium transition-colors " +
            (current === i + 1
              ? "border-[#006EB7] bg-[#006EB7] text-white"
              : "border-gray-200 text-[#595959] hover:border-[#006EB7] hover:text-[#006EB7]")
          }
        >
          {i + 1}
        </button>
      ))}

      {/* Próximo */}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function NoticiasContent() {
  const [pagina, setPagina] = useState(1);

  const destaque   = NOTICIAS.find((n) => n.destaque) ?? NOTICIAS[0];
  const outras     = NOTICIAS.filter((n) => n.id !== destaque.id);
  const sidebar    = outras.slice(0, 3);

  const totalPaginas = Math.ceil(NOTICIAS.length / NOTICIAS_POR_PAGINA);
  const noticiaAtual = NOTICIAS[(pagina - 1) % NOTICIAS.length];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px] md:items-start md:gap-12">

          {/* ── Notícia principal — esquerda ── */}
          <article>
            {/* Categoria */}
            <p className="text-xs font-bold uppercase tracking-wider text-[#F47920]">
              {noticiaAtual.categoria}
            </p>

            {/* Título */}
            <h1
              className="mt-2 font-black leading-tight text-[#00497F]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {noticiaAtual.titulo}
            </h1>

            {/* Divisor */}
            <div className="mt-3 rounded-full bg-[#006EB7]" style={{ width: "77px", height: "6px" }} />

            {/* Data */}
            <p className="mt-3 text-xs text-[#BCBABA]">{formatarData(noticiaAtual.data)}</p>

            {/* Fotos — até 8 */}
            <div className="mt-5 flex flex-col gap-4">
              {noticiaAtual.fotos.map((foto, i) => (
                <div key={i} className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={foto}
                    alt={`${noticiaAtual.titulo} — foto ${i + 1}`}
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
              {noticiaAtual.conteudo.split("\n\n").map((paragrafo, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#595959]">
                  {paragrafo}
                </p>
              ))}
            </div>

            {/* Paginação */}
            <Paginacao
              current={pagina}
              total={totalPaginas}
              onChange={setPagina}
            />
          </article>

          {/* ── Sidebar — direita ── */}
          <aside className="sticky top-28 flex flex-col gap-5">
            <h2 className="text-center text-base font-semibold text-[#595959]">
              Outras notícias
            </h2>

            {/* Cards das outras notícias */}
            <div className="flex flex-col gap-4">
              {sidebar.map((n) => (
                <CardSidebar key={n.id} noticia={n} />
              ))}
            </div>

            {/* Newsletter */}
            <Newsletter />
          </aside>

        </div>
      </div>
    </section>
  );
}
