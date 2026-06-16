"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CaseItem = {
  id: string;
  slug: string;
  tag: string;
  titulo: string;
  subtitulo: string | null;
  capa: string;
};

const VISIBLE = 3;

export function OutrosCasesCarrossel({ items }: { items: CaseItem[] }) {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - VISIBLE);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Seta esquerda */}
      <button onClick={prev} disabled={index === 0} aria-label="Case anterior"
        className={"absolute -left-5 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
          (index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Seta direita */}
      <button onClick={next} disabled={index >= maxIndex} aria-label="Próximo case"
        className={"absolute -right-5 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
          (index >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Viewport */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${index} * (100% / ${VISIBLE}) - ${index} * (20px / ${VISIBLE})))` }}
        >
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="group shrink-0 flex flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              style={{ width: `calc(100% / ${VISIBLE} - ${(20 * (VISIBLE - 1)) / VISIBLE}px)` }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={c.capa}
                  alt={c.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <span className="w-fit rounded-full bg-[#0084E5]/10 px-2.5 py-0.5 text-xs font-bold text-[#0084E5]">
                  {c.tag}
                </span>
                <h3 className="text-sm font-black leading-snug text-[#00497F] line-clamp-2">
                  {c.titulo}
                </h3>
                {c.subtitulo && (
                  <p className="text-xs text-[#595959] line-clamp-1">{c.subtitulo}</p>
                )}
                <span className="mt-1 text-xs font-bold text-[#006EB7] underline underline-offset-2">
                  Saiba mais →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
