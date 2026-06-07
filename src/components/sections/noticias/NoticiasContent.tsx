"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NOTICIAS, formatarData, type Noticia } from "@/data/noticias";

// ── Carrossel de fotos extras ─────────────────────────────────────────────────
function CarrosselFotos({
  fotos,
  titulo,
}: {
  fotos: string[];
  titulo: string;
}) {
  const [index, setIndex] = useState(0);
  if (fotos.length <= 1) return null;

  const extras = fotos.slice(1); // ignora a capa
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(extras.length - 1, i + 1));

  return (
    <div className="relative mt-6">
      <div className="overflow-hidden rounded-[12px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {extras.map((foto, i) => (
            <div
              key={i}
              className="relative w-full shrink-0"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={foto}
                alt={`${titulo} — foto ${i + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Setas */}
      {extras.length > 1 && (
        <>
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Foto anterior"
            className={
              "absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
              (index === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#006EB7] hover:text-white")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index === extras.length - 1}
            aria-label="Próxima foto"
            className={
              "absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
              (index === extras.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#006EB7] hover:text-white")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {extras.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {extras.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={
                "rounded-full transition-all duration-300 " +
                (i === index
                  ? "w-6 h-2 bg-[#006EB7]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Card da sidebar ───────────────────────────────────────────────────────────
function CardSidebar({
  noticia,
  ativo,
  onClick,
}: {
  noticia: Noticia;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        textAlign: "left",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "190px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={noticia.capa}
          alt={noticia.titulo}
          style={{ width: "100%", height: "190px", objectFit: "cover", display: "block" }}
        />

        {/* Overlay base */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
        }} />

        {/* Overlay azul quando ativo */}
        {ativo && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0, 73, 127, 0.45)",
          }} />
        )}

        {/* Badge "Lendo agora" */}
        {ativo && (
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            background: "#006EB7",
            color: "white",
            fontSize: "10px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "999px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>
            Lendo agora
          </div>
        )}

        {/* Texto */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px" }}>
          <p style={{
            color: "white", fontSize: "13px", fontWeight: 600,
            lineHeight: 1.4, margin: 0,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {noticia.titulo}
          </p>
          {!ativo && (
            <span style={{
              color: "white", fontSize: "11px", fontWeight: 700,
              textDecoration: "underline", marginTop: "6px", display: "inline-block",
            }}>
              Saiba mais
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <div className="rounded-[12px] bg-[#F6F6F6] p-5">
      <p className="text-sm font-bold text-[#006EB7]">Receba nossas notícias</p>
      <p className="mt-1 text-xs text-[#595959]">
        Cadastre-se e receba nossas novidades em primeira mão.
      </p>
      <div className="mt-3 flex overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none"
        />
        <button className="flex items-center gap-1.5 bg-[#006EB7] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#00497F]">
          Cadastrar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function NoticiasContent() {
  const destaque = NOTICIAS.find((n) => n.destaque) ?? NOTICIAS[0];
  const [ativa, setAtiva] = useState<Noticia>(destaque);
  const topoRef = useRef<HTMLDivElement>(null);

  const handleSelect = (noticia: Noticia) => {
    setAtiva(noticia);
    // Scrolla suavemente para o topo do artigo em mobile
    topoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px] md:items-start md:gap-12">
          {/* ── Notícia ativa — esquerda ── */}
          <article ref={topoRef}>
            {/* Categoria */}
            <p className="text-xs font-bold uppercase tracking-wider text-[#006EB7]">
              {ativa.categoria}
            </p>

            {/* Título */}
            <h1
              className="mt-2 font-black leading-tight text-[#00497F]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {ativa.titulo}
            </h1>

            {/* Divisor */}
            <div
              className="mt-3  bg-[#0084E5]"
              style={{ width: "77px", height: "6px" }}
            />

            {/* Data */}
            <p className="mt-2 text-xs text-[#BCBABA]">
              {formatarData(ativa.data)}
            </p>

            {/* Foto capa */}
            <div
              className="relative mt-5 w-full overflow-hidden rounded-[12px]"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={ativa.capa}
                alt={ativa.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Texto */}
            <div className="mt-6 flex flex-col gap-4">
              {ativa.conteudo.split("\n\n").map((paragrafo, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#595959]">
                  {paragrafo}
                </p>
              ))}
            </div>

            {/* Carrossel de fotos extras */}
            <CarrosselFotos fotos={ativa.fotos} titulo={ativa.titulo} />
          </article>

          {/* ── Sidebar — direita ── */}
          <aside className="sticky top-28 flex flex-col gap-5 min-w-0">
            <h2 className="text-center text-base font-semibold text-[#595959]">
              Outras notícias
            </h2>

            {/* 3 cards (190px + 16px gap) = 612px visíveis, resto rola */}
            <div
              className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden"
              style={{
                maxHeight: "612px",
                scrollbarWidth: "thin",
                scrollbarColor: "#006EB7 #F0F0F0",
              }}
            >
              {NOTICIAS.map((n) => (
                <CardSidebar
                  key={n.id}
                  noticia={n}
                  ativo={n.id === ativa.id}
                  onClick={() => handleSelect(n)}
                />
              ))}
            </div>

            {/* Newsletter — fora do scroll */}
            <Newsletter />
          </aside>
        </div>
      </div>
    </section>
  );
}
