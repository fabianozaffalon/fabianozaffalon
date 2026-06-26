"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/broker/apresentacao-broker-1.jpg", alt: "Estrutura Broker Fabiano Zaffalon Nestlé" },
  { src: "/images/broker/apresentacao-broker-2.jpg", alt: "Operação Broker Fabiano Zaffalon Nestlé" },
  { src: "/images/broker/apresentacao-broker-3.jpg", alt: "Estrutura Broker Fabiano Zaffalon Nestlé" },
  { src: "/images/broker/apresentacao-broker-4.jpg", alt: "Produtos Nestlé Broker Fabiano Zaffalon" },
];

const INTERVAL = 4500;
const DURATION = 700;

function BrokerCarrossel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRef = useRef(0);
  const fadingRef = useRef(false);

  const goTo = useCallback((nextIdx: number) => {
    if (fadingRef.current || nextIdx === currentRef.current) return;

    fadingRef.current = true;
    setFading(true);
    setPrev(currentRef.current);
    setCurrent(nextIdx);
    currentRef.current = nextIdx;

    setTimeout(() => {
      setPrev(null);
      setFading(false);
      fadingRef.current = false;
    }, DURATION);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((currentRef.current + 1) % SLIDES.length);
      }
    }, INTERVAL);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, startTimer]);

  return (
    <div
      className="flex flex-col gap-0"
      onMouseEnter={() => { pausedRef.current = true; if (timerRef.current) clearTimeout(timerRef.current); }}
      onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
    >
      <div className="relative w-full overflow-hidden rounded-t-[16px]" style={{ aspectRatio: "16/10" }}>

        {/* Slide anterior — fica embaixo, sempre opaco */}
        {prev !== null && (
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <Image
              src={SLIDES[prev].src}
              alt={SLIDES[prev].alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Slide atual — entra por cima com fade in */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            opacity: fading ? 0 : 1,
            transition: fading ? "none" : `opacity ${DURATION}ms ease-in-out`,
          }}
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={current === 0}
          />
        </div>

        {/* Setas */}
        <button
          onClick={() => goTo((currentRef.current - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Foto anterior"
          style={{ zIndex: 10 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => goTo((currentRef.current + 1) % SLIDES.length)}
          aria-label="Próxima foto"
          style={{ zIndex: 10 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5" style={{ zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1}`}
              className={
                "rounded-full transition-all duration-300 " +
                (i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80")
              }
            />
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-2 rounded-b-[16px] bg-[#00497F]">
        <div className="flex items-center gap-3 px-5 py-4 md:px-6 md:py-5">
          <Image src="/images/icons/icon-broker.svg" alt="" aria-hidden="true" width={48} height={48} className="h-12 w-12 shrink-0 brightness-0 invert" />
          <div className="flex flex-col">
            <span className="text-sm font-normal leading-snug text-white/70">Broker Exclusivo</span>
            <span className="text-lg font-bold leading-snug text-white">Nestlé</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 md:px-6 md:py-5">
          <Image src="/images/icons/icon-estrutura.svg" alt="" aria-hidden="true" width={48} height={48} className="h-12 w-12 shrink-0 brightness-0 invert" />
          <div className="flex flex-col">
            <span className="text-sm font-normal leading-snug text-white/70">Parceria construída</span>
            <span className="text-lg font-bold leading-snug text-white">com confiança</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrokerApresentacao() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex flex-col gap-5">
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)" }}
            >
              Ao lado da Nestlé, construindo
              <br />
              valor no mercado.
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              A trajetória da Broker Fabiano Zaffalon junto à Nestlé é resultado
              de uma parceria construída com trabalho, comprometimento e entrega
              de resultados. Nossa história teve início na representação de
              marcas da companhia, desenvolvendo um trabalho próximo ao mercado,
              fortalecendo relacionamentos e ampliando a presença dos produtos
              nos pontos de venda.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              O reconhecimento dessa trajetória se consolidou com a posição de
              Broker exclusivo da Nestlé em nossas áreas de atuação. Uma
              conquista que reflete não apenas a robustez da nossa estrutura e
              dos nossos processos, mas também a dedicação de nossa equipe
              comprometida em representar uma das maiores empresas de alimentos
              do mundo.
            </p>
          </div>
          <BrokerCarrossel />
        </div>
      </div>
    </section>
  );
}
