"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConsultorButton } from "@/components/sections/ConsultorModal";

type Oferta = {
  id: string;
  titulo: string;
  imagem: string;
  link: string | null;
};

const INTERVAL = 5000;

export function CtaBannerCarrossel({ ofertas }: { ofertas: Oferta[] }) {
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const goTo = useCallback((next: number) => {
    setOpacity(0);
    setTimeout(() => {
      setIndex(next);
      indexRef.current = next;
      setOpacity(1);
    }, 300);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (ofertas.length <= 1) return;
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) goTo((indexRef.current + 1) % ofertas.length);
    }, INTERVAL);
  }, [goTo, ofertas.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, startTimer]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    startTimer();
  };

  const prev = () =>
    goTo((indexRef.current - 1 + ofertas.length) % ofertas.length);
  const next = () => goTo((indexRef.current + 1) % ofertas.length);

  // Sem ofertas — fallback estático com modal
  if (ofertas.length === 0) {
    return (
      <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <div className="rounded-[28px] bg-[#006EB7] px-8 py-10 md:rounded-[40px] md:px-14 md:py-12">
            <div className="flex flex-col gap-4">
              <h2
                className="font-black leading-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                Conte com a gente para
                <br />
                conquistar o seu espaço.
              </h2>
              <p className="text-sm text-white/95">
                Temos sempre uma grande oportunidade para o seu negócio.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* ✅ SUBSTITUÍDO: Quero Comprar → abre o modal */}
                <ConsultorButton className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] bg-white text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#005a96] hover:text-white">
                  Quero Comprar
                </ConsultorButton>

                {/* ✅ SUBSTITUÍDO: Quero Representação → abre o modal */}
                <ConsultorButton className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] border-2 border-white text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]">
                  Quero Representação
                </ConsultorButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const oferta = ofertas[index];

  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-6 py-6 md:rounded-[40px] md:px-8 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
            {/* Esquerda — carrossel de imagens */}
            <div className="relative md:w-[38%]">
              <p className="mb-2 text-base font-bold text-white md:text-lg">
                Destaques do mês
              </p>

              {/* Imagem com fade — clicável, pausa só aqui */}
              <div
                style={{ opacity, transition: "opacity 300ms ease-in-out" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/ofertas?id=${oferta.id}`}
                  className="relative block w-full overflow-hidden rounded-[16px] cursor-pointer group"
                  aria-label={`Ver oferta: ${oferta.titulo}`}
                >
                  <Image
                    src={oferta.imagem}
                    alt={oferta.titulo}
                    width={1080}
                    height={618}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 38vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[16px]" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#006EB7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver oferta
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
                  </div>
                </Link>
              </div>

              {/* Setas — só se tiver mais de 1 */}
              {ofertas.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Oferta anterior"
                    className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-4 w-4"
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
                    aria-label="Próxima oferta"
                    className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-4 w-4"
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
              {ofertas.length > 1 && (
                <div className="mt-3 flex items-center justify-center">
                  {ofertas.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Oferta ${i + 1}`}
                      className="group flex items-center justify-center p-2.5"
                    >
                      <span
                        className={
                          "block rounded-full transition-all duration-300 " +
                          (i === index
                            ? "w-5 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70")
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direita — texto e botões */}
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2
                  className="font-black text-white"
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    lineHeight: 1.2,
                  }}
                >
                  Conte com a gente
                  <br />
                  para conquistar
                  <br />o seu espaço.
                </h2>
                <p className="text-sm leading-snug text-white/95 md:text-base">
                  Temos sempre uma grande oportunidade para o seu negócio.
                  <br />
                  Chame o consultor da sua região e descubra.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* ✅ SUBSTITUÍDO: Quero Comprar → abre o modal */}
                <ConsultorButton className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] bg-white text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#005a96] hover:text-white">
                  Quero Comprar
                </ConsultorButton>

                {/* ✅ SUBSTITUÍDO: Quero Representação → abre o modal */}
                <ConsultorButton className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] border-2 border-white text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]">
                  Quero Representação
                </ConsultorButton>
              </div>

              {/* Link ver todas as ofertas */}
              <Link
                href="/ofertas"
                className="flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Ver todas as ofertas do mês
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
