"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/**
 * ─── COMO ADICIONAR MARCAS ───────────────────────────────────────────
 * Adicione um novo objeto no array BRANDS e coloque o SVG/PNG em
 * /public/images/brands/. O carrossel ajusta automaticamente.
 * ─────────────────────────────────────────────────────────────────────
 */
const BRANDS = [
  { id: "suzano-1",    name: "Suzano",    logo: "/images/brands/suzano.svg"    },
  { id: "piraque-1",   name: "Piraquê",   logo: "/images/brands/piraque.svg"   },
  { id: "bic-1",       name: "BIC",       logo: "/images/brands/bic.svg"       },
  { id: "havaianas-1", name: "Havaianas", logo: "/images/brands/havaianas.svg" },
  { id: "yoki-1",      name: "Yoki",      logo: "/images/brands/yoki.svg"      },
  // Adicione mais marcas aqui ↓
  // { id: "novamarca-1", name: "Nova Marca", logo: "/images/brands/novamarca.svg" },
];

// Lista triplicada para loop imperceptível
const TRACK  = [...BRANDS, ...BRANDS, ...BRANDS];
const ITEM_W = 280; // ← mais espaço entre logos
const SPEED  = 0.5; // px por frame — suave e profissional

export function Brands() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef(false);

  const blockW = BRANDS.length * ITEM_W;

  const animate = useCallback(() => {
    if (!pausedRef.current && trackRef.current) {
      posRef.current += SPEED;
      if (posRef.current >= blockW) posRef.current -= blockW;
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [blockW]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const pause  = () => { pausedRef.current = true;  };
  const resume = () => { pausedRef.current = false; };

  const scrollBy = (dir: 1 | -1) => {
    posRef.current += dir * ITEM_W * 2;
    if (posRef.current < 0)       posRef.current += blockW;
    if (posRef.current >= blockW) posRef.current -= blockW;
  };

  return (
    <section
      id="marcas"
      className="bg-[#1A4FA0]"
      style={{ paddingTop: "56px", paddingBottom: "56px" }}
    >
      {/* Título + link catálogo */}
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center text-xl font-semibold text-white md:text-2xl sm:text-left">
            Marcas que Representamos
          </h2>
          <a
            href="/catalogo"
            className="shrink-0 rounded-[8px] border-2 border-white px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1A4FA0] whitespace-nowrap"
          >
            Ver catálogo completo →
          </a>
        </div>
      </div>

      {/* Carrossel */}
      <div
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        aria-label="Marcas representadas"
      >
        {/* Fade esquerda */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[#1A4FA0] to-transparent" />
        {/* Fade direita */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[#1A4FA0] to-transparent" />

        {/* Seta esquerda */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Marcas anteriores"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-white md:left-6 md:h-10 md:w-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Seta direita */}
        <button
          onClick={() => scrollBy(1)}
          aria-label="Próximas marcas"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-white md:right-6 md:h-10 md:w-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Faixa deslizante */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
          >
            {TRACK.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                aria-hidden={i >= BRANDS.length}
                className="flex shrink-0 items-center justify-center"
                style={{ width: `${ITEM_W}px` }}
              >
                <Image
                  src={brand.logo}
                  alt={i < BRANDS.length ? brand.name : ""}
                  width={100}
                  height={40}
                  className="h-7 w-auto object-contain brightness-0 invert opacity-80 transition-opacity hover:opacity-100 md:h-8"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
