"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const CULTURA = [
  {
    icon: "/images/icons/icon-missao.svg",
    titulo: "Missão",
    texto:
      "Conectar grandes marcas ao mercado por meio de uma operação eficiente, confiável e comprometida com resultados. Trabalhar diariamente para oferecer soluções que contribuam para o crescimento de clientes, parceiros e colaboradores, fortalecendo relações construídas com responsabilidade, proximidade e excelência em cada etapa do processo.",
  },
  {
    icon: "/images/icons/icon-visao.svg",
    titulo: "Visão",
    texto:
      "Ser reconhecida como uma das principais distribuidoras do Sul do Brasil, referência em qualidade operacional, desenvolvimento de pessoas e geração de valor para toda a cadeia de negócios atendidos. Crescer de forma sustentável, ampliando oportunidades e fortalecendo parcerias que impulsionam o desenvolvimento conjunto.",
  },
  {
    icon: "/images/icons/icon-valores.svg",
    titulo: "Valores",
    texto:
      "Compromisso com as pessoas, respeito às relações de confiança, ética nas decisões, excelência na execução e busca constante por evolução. Valorizamos o trabalho em equipe, a responsabilidade com nossos parceiros e a capacidade de transformar desafios em oportunidades de crescimento, mantendo sempre o foco na qualidade e nos resultados.",
  },
];

function Card({ item }: { item: typeof CULTURA[0] }) {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-gray-200 bg-white p-6">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <Image
          src="/images/ui/grid-pattern.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <Image
            src={item.icon}
            alt={item.titulo}
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0"
          />
          <h3 className="text-xl font-bold text-[#006EB7]">{item.titulo}</h3>
        </div>
        <div className="mb-4 h-px w-full bg-gray-200" />
        <p className="text-sm leading-relaxed text-[#595959]">{item.texto}</p>
      </div>
    </div>
  );
}

export function EmpresaCultura() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

        <h2
          className="mb-10 text-center font-semibold text-[#595959]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Nossa Cultura
        </h2>

        {/* Desktop — grid 3 colunas */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {CULTURA.map((item) => (
            <Card key={item.titulo} item={item} />
          ))}
        </div>

        {/* Mobile — scroll snap fullwidth */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CULTURA.map((item) => (
              <div
                key={item.titulo}
                className="w-full shrink-0 snap-center snap-always"
              >
                <Card item={item} />
              </div>
            ))}
          </div>

          {/* Dots + hint */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {CULTURA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`${CULTURA[i].titulo}`}
                  className={
                    "rounded-full transition-all duration-300 " +
                    (i === activeIndex
                      ? "w-6 h-2 bg-[#006EB7]"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400")
                  }
                />
              ))}
            </div>
            {activeIndex < CULTURA.length - 1 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>Deslize para ver mais</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
