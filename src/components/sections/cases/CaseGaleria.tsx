"use client";

import { useState } from "react";

export function CaseGaleria({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [index, setIndex] = useState(0);

  if (fotos.length === 0) return null;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(fotos.length - 1, i + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Foto principal */}
      <div className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "16/9" }}>
        <img
          src={fotos[index]}
          alt={`${titulo} — foto ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Setas */}
        {fotos.length > 1 && (
          <>
            <button onClick={prev} disabled={index === 0} aria-label="Foto anterior"
              className={"absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-[#006EB7] transition-all " +
                (index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={next} disabled={index === fotos.length - 1} aria-label="Próxima foto"
              className={"absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-[#006EB7] transition-all " +
                (index === fotos.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            {/* Contador */}
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {fotos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails horizontais */}
      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={"relative shrink-0 overflow-hidden rounded-[8px] transition-all " +
                (i === index ? "ring-2 ring-[#006EB7]" : "opacity-60 hover:opacity-100")}
              style={{ width: "80px", height: "54px" }}
            >
              <img
                src={foto}
                alt={`Thumbnail ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
