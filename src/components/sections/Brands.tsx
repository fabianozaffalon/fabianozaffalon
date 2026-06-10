"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const BRANDS = [
  { id: "suzano",    name: "Suzano",         logo: "/images/brands/suzano.svg"    },
  { id: "piraque",   name: "Piraquê",        logo: "/images/brands/piraque.svg"   },
  { id: "bic",       name: "BIC",            logo: "/images/brands/bic.svg"       },
  { id: "havaianas", name: "Havaianas",      logo: "/images/brands/havaianas.svg" },
  { id: "yoki",      name: "Yoki",           logo: "/images/brands/yoki.svg"      },
  { id: "aurea",     name: "Áurea",          logo: "/images/brands/aurea.svg"     },
  { id: "condor",    name: "Condor",         logo: "/images/brands/condor.svg"    },
  { id: "dori",      name: "Dori",           logo: "/images/brands/dori.svg"      },
  { id: "ype",       name: "Ypê",            logo: "/images/brands/ype.svg"       },
  { id: "seara",     name: "Seara",          logo: "/images/brands/seara.svg"     },
  { id: "bunge",     name: "Bunge",          logo: "/images/brands/bunge.svg"     },
  { id: "kimberly",  name: "Kimberly-Clark", logo: "/images/brands/kimberly.svg"  },
  { id: "isabela",   name: "Isabela",        logo: "/images/brands/isabela.svg"   },
  { id: "nestle",    name: "Nestlé",         logo: "/images/brands/nestle.svg"    },
  { id: "purina",    name: "Purina",         logo: "/images/brands/purina.svg"    },
  { id: "garoto",    name: "Garoto",         logo: "/images/brands/garoto.svg"    },
  { id: "nestle-pro",name: "Nestlé Pro",     logo: "/images/brands/nestle-professional.svg" },
  { id: "ferrero",   name: "Ferrero",        logo: "/images/brands/ferrero.svg"   },
];

const PER_PAGE = 9;
const INTERVAL = 4000;

export function Brands() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPages = Math.ceil(BRANDS.length / PER_PAGE);
  const currentBrands = BRANDS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Divide em linhas de 3 — última linha centralizada se incompleta
  const rows: typeof BRANDS[] = [];
  for (let i = 0; i < currentBrands.length; i += 3) {
    rows.push(currentBrands.slice(i, i + 3));
  }

  const goTo = (next: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setPage(next);
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) goTo((page + 1) % totalPages);
    }, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [page, fading]);

  return (
    <section
      id="marcas"
      className="bg-[#1A4FA0]"
      style={{ paddingTop: "56px", paddingBottom: "56px" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
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
              <br />Representamos
            </h2>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              A confiança construída ao longo da nossa trajetória nos permitiu reunir um
              portfólio com mais de{" "}
              <strong className="font-semibold text-white">4 mil produtos</strong> de marcas
              líderes em qualidade e credibilidade, oferecendo soluções completas para
              varejo e food service de todos os portes.
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

            {/* Logos — linhas de 3, última centralizada */}
            <div
              className="flex flex-col gap-5 transition-opacity duration-350"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex items-center justify-center gap-6"
                >
                  {row.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex flex-1 items-center justify-center"
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={130}
                        height={52}
                        className="h-10 max-w-[130px] object-contain brightness-0 invert opacity-90 transition-opacity hover:opacity-100 md:h-12"
                        style={{ width: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
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
