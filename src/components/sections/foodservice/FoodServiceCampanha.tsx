"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const BANNERS = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/foodservice/banners/banner-${i + 1}.jpg`,
  alt: `Campanha Food Service Fabiano Zaffalon ${i + 1}`,
}));

const INTERVAL = 4000;

export function FoodServiceCampanha() {
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
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((indexRef.current + 1) % BANNERS.length);
      }
    }, INTERVAL);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, startTimer]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startTimer();
  };

  const prev = () => goTo((indexRef.current - 1 + BANNERS.length) % BANNERS.length);
  const next = () => goTo((indexRef.current + 1) % BANNERS.length);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ opacity, transition: "opacity 300ms ease-in-out" }}>
        <Image
          src={BANNERS[index].src}
          alt={BANNERS[index].alt}
          width={1920}
          height={480}
          className="w-full h-auto"
          sizes="100vw"
          priority={index === 0}
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
            className={"rounded-full transition-all duration-300 " + (i === index ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80")} />
        ))}
      </div>
    </section>
  );
}
