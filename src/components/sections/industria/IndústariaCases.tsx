"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Cases específicos da Indústria — serão dinâmicos futuramente
const CASES = [
  {
    id: 1,
    image: "/images/cases/industria/case-ind-1.jpg",
    title: "Título do case 1 da Indústria",
    href: "#",
  },
  {
    id: 2,
    image: "/images/cases/industria/case-ind-2.jpg",
    title: "Título do case 2 da Indústria",
    href: "#",
  },
  {
    id: 3,
    image: "/images/cases/industria/case-ind-3.jpg",
    title: "Título do case 3 da Indústria",
    href: "#",
  },
];

const VISIBLE = 2;

export function IndústariaCases() {
  const [index, setIndex] = useState(0);
  const maxIndex = CASES.length - VISIBLE;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-12 md:items-center">
          {/* Título + texto — esquerda */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Cases de
              <br />
              crescimento
            </h2>
            <p className="text-sm leading-relaxed text-[#595959] md:text-base">
              A nossa história é contada também por alguns casos de sucesso.
              Confira alguns deles e descubra como a Fabiano Zaffalon transforma
              desafio em resultado.
            </p>
          </div>

          {/* Carrossel — direita */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <button
                onClick={prev}
                disabled={index === 0}
                aria-label="Case anterior"
                className={"absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " + (index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#006EB7] hover:text-white")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={index >= maxIndex}
                aria-label="Próximo case"
                className={"absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " + (index >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-[#006EB7] hover:text-white")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(calc(-${index} * (100% / ${VISIBLE}) - ${index} * (8px)))` }}
                >
                  {CASES.map((item) => (
                    <article
                      key={item.id}
                      className="group relative shrink-0 overflow-hidden rounded-xl"
                      style={{ width: `calc(100% / ${VISIBLE} - 8px)` }}
                    >
                      {/* Proporção 351/244 fiel ao Figma — sem efeitos */}
                      <div className="relative w-full" style={{ aspectRatio: "351/244" }}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="30vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-xs font-semibold leading-snug text-white md:text-sm">
                            {item.title}
                          </h3>
                          <Link
                            href={item.href}
                            className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-2 hover:opacity-80 transition-opacity md:text-sm"
                          >
                            Saiba mais
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots — abaixo do carrossel */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para página ${i + 1}`}
                  className={"rounded-full transition-all duration-300 " + (i === index ? "w-6 h-2 bg-[#006EB7]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
