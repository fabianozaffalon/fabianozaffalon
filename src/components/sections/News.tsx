"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NOTICIAS } from "@/data/noticias";

// Home exibe as 6 primeiras notícias — quando virar dinâmico, só troca por fetch
const NEWS = NOTICIAS.slice(0, 6).map((n) => ({
  id:    n.id,
  image: n.capa,
  title: n.titulo,
  href:  `/noticias/${n.slug}`,
}));

const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE  = 1;

export function News() {
  const [index, setIndex] = useState(0);

  // Quantos cards visíveis depende do breakpoint — controlado via JS
  // Para SSR seguro usamos sempre VISIBLE_DESKTOP como referência
  const total        = NEWS.length;
  const maxDesktop   = total - VISIBLE_DESKTOP; // 3
  const maxMobile    = total - VISIBLE_MOBILE;  // 5

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxDesktop, i + 1));

  const canPrev = index > 0;
  const canNext = index < maxDesktop;

  return (
    <section id="noticias" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">

        {/* Título */}
        <h2 className="mb-8 text-center text-xl font-semibold text-[#595959] md:mb-10 md:text-2xl">
          Nossas Notícias
        </h2>

        {/* Wrapper com setas */}
        <div className="relative">

          {/* Seta esquerda */}
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Notícias anteriores"
            className={
              "absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all md:-left-6 md:h-12 md:w-12 " +
              (canPrev ? "opacity-100 hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]" : "opacity-30 cursor-not-allowed")
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Seta direita */}
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Próximas notícias"
            className={
              "absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all md:-right-6 md:h-12 md:w-12 " +
              (canNext ? "opacity-100 hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]" : "opacity-30 cursor-not-allowed")
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Viewport — overflow hidden esconde os cards fora de cena */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${index} * (100% / ${VISIBLE_DESKTOP}) - ${index} * (${16 / VISIBLE_DESKTOP}px)))`,
              }}
            >
              {NEWS.map((item) => (
                <article
                  key={item.id}
                  className="group relative shrink-0 overflow-hidden rounded-xl"
                  style={{
                    width: `calc(100% / ${VISIBLE_DESKTOP} - ${(16 * (VISIBLE_DESKTOP - 1)) / VISIBLE_DESKTOP}px)`,
                    marginRight: "16px",
                  }}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Conteúdo */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <h3 className="text-sm font-semibold leading-snug text-white md:text-base">
                        {item.title}
                      </h3>
                      <Link
                        href={item.href}
                        className="mt-2 inline-block text-sm font-semibold text-white underline underline-offset-2 transition-opacity hover:opacity-80"
                      >
                        Saiba mais
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Dots indicadores */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxDesktop + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para página ${i + 1}`}
              className={
                "rounded-full transition-all duration-300 " +
                (i === index
                  ? "w-6 h-2 bg-[#006EB7]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400")
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}
