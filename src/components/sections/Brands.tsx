"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const BRANDS = [
  { id: "suzano", name: "Suzano", logo: "/images/brands/suzano.svg" },
  { id: "piraque", name: "Piraquê", logo: "/images/brands/piraque.svg" },
  { id: "bic", name: "BIC", logo: "/images/brands/bic.svg" },
  { id: "seara", name: "Seara", logo: "/images/brands/seara.svg" },
  { id: "yoki", name: "Yoki", logo: "/images/brands/yoki.svg" },
  { id: "aurea", name: "Áurea", logo: "/images/brands/aurea.svg" },
  { id: "condor", name: "Condor", logo: "/images/brands/condor.svg" },
  { id: "dori", name: "Dori", logo: "/images/brands/dori.svg" },
  { id: "ype", name: "Ypê", logo: "/images/brands/ype.svg" },
  { id: "bunge", name: "Bunge", logo: "/images/brands/bunge.svg" },
  {
    id: "kimberly",
    name: "Kimberly-Clark",
    logo: "/images/brands/kimberly.svg",
  },
  { id: "isabela", name: "Isabela", logo: "/images/brands/isabela.svg" },
  { id: "nestle", name: "Nestlé", logo: "/images/brands/nestle.svg" },
  { id: "purina", name: "Purina", logo: "/images/brands/purina.svg" },
  { id: "garoto", name: "Garoto", logo: "/images/brands/garoto.svg" },
  {
    id: "nestle-pro",
    name: "Nestlé Pro",
    logo: "/images/brands/nestle-professional.svg",
  },
  { id: "ferrero", name: "Ferrero", logo: "/images/brands/ferrero.svg" },
];

const PER_PAGE = 9;
const INTERVAL = 4000;

export function Brands() {
  const [page, setPage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageRef = useRef(0);

  const totalPages = Math.ceil(BRANDS.length / PER_PAGE);
  const currentBrands = BRANDS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const rows: (typeof BRANDS)[] = [];
  for (let i = 0; i < currentBrands.length; i += 3) {
    rows.push(currentBrands.slice(i, i + 3));
  }

  const goTo = useCallback((next: number) => {
    setOpacity(0);
    setTimeout(() => {
      setPage(next);
      pageRef.current = next;
      setOpacity(1);
    }, 300);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((pageRef.current + 1) % totalPages);
      }
    }, INTERVAL);
  }, [goTo, totalPages]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [page, startTimer]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startTimer();
  };

  return (
    <section
      id="marcas"
      className="bg-[#1A4FA0]"
      style={{ paddingTop: "56px", paddingBottom: "56px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* Esquerda — título + texto + botão */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Marcas que
              <br />
              Representamos
            </h2>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              A confiança construída ao longo da nossa trajetória nos permitiu
              reunir um portfólio com mais de{" "}
              <strong className="font-semibold text-white">
                4 mil produtos
              </strong>{" "}
              de marcas líderes em qualidade e credibilidade, oferecendo
              soluções completas para varejo e food service de todos os portes.
            </p>
            <div>
              <a
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-[8px] border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1A4FA0] whitespace-nowrap"
              >
                Veja nosso catálogo
              </a>
            </div>
          </div>

          {/* Direita — logos + dots */}
          <div className="flex flex-col gap-6">
            {/* Logos com fade */}
            <div style={{ opacity, transition: "opacity 300ms ease-in-out" }}>
              <div className="flex flex-col gap-5">
                {rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex items-center justify-center gap-6"
                  >
                    {row.map((brand) => (
                      <div
                        key={brand.id}
                        className="group flex flex-1 items-center justify-center"
                      >
                        {/* Container relativo com altura fixa — fill funciona corretamente */}
                        <div className="relative h-12 w-full max-w-[130px]">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            className="object-contain brightness-0 invert opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                            sizes="130px"
                          />
                        </div>
                      </div>
                    ))}
                    {/* Preenche colunas vazias na última linha */}
                    {row.length < 3 &&
                      Array.from({ length: 3 - row.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="flex-1" />
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Página ${i + 1}`}
                  className={
                    "rounded-full transition-all duration-300 " +
                    (i === page
                      ? "w-6 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
