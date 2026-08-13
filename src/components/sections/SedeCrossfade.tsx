"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/empresa/sede-rp.jpg", alt: "Sede da Fabiano Zaffalon Distribuidora — Rio Pardo" },
  { src: "/images/empresa/sede-p.jpg", alt: "Sede da Fabiano Zaffalon Distribuidora — Pelotas" },
];

const INTERVAL = 4500;
const DURATION = 700;

export function SedeCrossfade() {
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
      className="absolute inset-0"
      onMouseEnter={() => { pausedRef.current = true; if (timerRef.current) clearTimeout(timerRef.current); }}
      onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
    >
      {prev !== null && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Image
            src={SLIDES[prev].src}
            alt={SLIDES[prev].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

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
          className="object-cover"
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
  );
}
