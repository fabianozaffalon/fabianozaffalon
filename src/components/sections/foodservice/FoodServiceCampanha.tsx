"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const BANNERS = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/foodservice/banners/banner-${i + 1}.jpg`,
  alt: `Campanha Food Service Fabiano Zaffalon ${i + 1}`,
}));

const INTERVAL = 4000;
const FADE_MS = 300;

export function FoodServiceCampanha() {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [incomingVisible, setIncomingVisible] = useState(false);

  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    if (next === targetRef.current) return;
    targetRef.current = next;
    if (promoteTimerRef.current) clearTimeout(promoteTimerRef.current);

    if (next === currentRef.current) {
      // voltou pro slide já exibido antes da transição concluir
      setIncoming(null);
      setIncomingVisible(false);
      return;
    }

    setIncomingVisible(false);
    setIncoming(next);
  }, []);

  // só inicia o crossfade quando a imagem de entrada já estiver
  // realmente decodificada — nunca troca "às cegas" via timer
  const handleIncomingLoaded = useCallback((loadedIndex: number) => {
    if (loadedIndex !== targetRef.current) return; // superada por um clique mais recente

    requestAnimationFrame(() => setIncomingVisible(true));

    promoteTimerRef.current = setTimeout(() => {
      currentRef.current = targetRef.current;
      setCurrent(targetRef.current);
      setIncoming(null);
      setIncomingVisible(false);
    }, FADE_MS);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((targetRef.current + 1) % BANNERS.length);
      }
    }, INTERVAL);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, startTimer]);

  useEffect(() => {
    return () => {
      if (promoteTimerRef.current) clearTimeout(promoteTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startTimer();
  };

  const prev = () =>
    goTo((targetRef.current - 1 + BANNERS.length) % BANNERS.length);
  const next = () => goTo((targetRef.current + 1) % BANNERS.length);

  const activeIndicator = incoming ?? current;
  const nextBanner = BANNERS[(current + 1) % BANNERS.length];

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full">
        <Image
          key={`base-${BANNERS[current].src}`}
          src={BANNERS[current].src}
          alt={BANNERS[current].alt}
          width={1920}
          height={480}
          className="w-full h-auto"
          sizes="100vw"
          priority={current === 0}
        />

        {incoming !== null && (
          <div
            className="absolute inset-0"
            style={{
              opacity: incomingVisible ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          >
            <Image
              key={`incoming-${BANNERS[incoming].src}`}
              src={BANNERS[incoming].src}
              alt={BANNERS[incoming].alt}
              width={1920}
              height={480}
              className="w-full h-auto"
              sizes="100vw"
              onLoad={() => handleIncomingLoaded(incoming)}
            />
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        <Image
          key={nextBanner.src}
          src={nextBanner.src}
          alt=""
          width={1920}
          height={480}
          sizes="100vw"
        />
      </div>

      <button onClick={prev} aria-label="Banner anterior"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 md:left-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button onClick={next} aria-label="Próximo banner"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 md:right-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Banner ${i + 1}`}
            className={"rounded-full transition-all duration-300 " + (i === activeIndicator ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80")} />
        ))}
      </div>
    </section>
  );
}
