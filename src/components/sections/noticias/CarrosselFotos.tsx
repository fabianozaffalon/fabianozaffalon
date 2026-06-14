"use client";

import { useState } from "react";

export function CarrosselFotos({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [index, setIndex] = useState(0);

  if (!fotos || fotos.length === 0) return null;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(fotos.length - 1, i + 1));

  return (
    <div className="relative mt-8">

      {/* Foto atual */}
      <div className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/9" }}>
        <img
          src={fotos[index]}
          alt={`${titulo} — foto ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Setas — só aparece se tiver mais de 1 foto */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Foto anterior"
            className={
              "absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-[#006EB7] transition-all " +
              (index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white")
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={index === fotos.length - 1}
            aria-label="Próxima foto"
            className={
              "absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-[#006EB7] transition-all " +
              (index === fotos.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white")
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Dots + contador */}
      {fotos.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {fotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                className={
                  "rounded-full transition-all duration-300 " +
                  (i === index ? "w-6 h-2 bg-[#006EB7]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400")
                }
              />
            ))}
          </div>
          <span className="text-xs text-[#BCBABA]">{index + 1} / {fotos.length}</span>
        </div>
      )}

    </div>
  );
}
