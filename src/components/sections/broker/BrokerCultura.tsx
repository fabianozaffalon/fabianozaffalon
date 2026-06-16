"use client";

import { useState } from "react";
import Image from "next/image";

const CULTURA = [
  {
    icon: "/images/icons/icon-missao.svg",
    titulo: "Missão",
    texto:
      "Representar a Nestlé com excelência, conectando estratégia e execução por meio de uma atuação próxima ao mercado, orientada por resultados e comprometida com o fortalecimento da marca, o desenvolvimento dos parceiros e a geração de valor para toda a cadeia de negócios.",
  },
  {
    icon: "/images/icons/icon-visao.svg",
    titulo: "Visão",
    texto:
      "Ser referência nacional em operação de broker, reconhecida pela capacidade de transformar conhecimento de mercado, relacionamento e execução em crescimento sustentável para as marcas que representamos, consolidando uma atuação cada vez mais relevante e estratégica.",
  },
  {
    icon: "/images/icons/icon-valores.svg",
    titulo: "Valores",
    texto:
      "Atuamos com compromisso, ética e responsabilidade nos relacionamentos que construímos. Valorizamos a excelência na execução, a busca contínua por evolução, o respeito às pessoas e a dedicação aos resultados, entendendo que a confiança é a base para o desenvolvimento de parcerias sólidas e duradouras.",
  },
];

export function BrokerCultura() {
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

        {/* Título */}
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

        {/* Mobile — carrossel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {CULTURA.map((item) => (
                <div key={item.titulo} className="w-full shrink-0 px-1">
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {CULTURA.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Card ${i + 1}`}
                className={
                  "rounded-full transition-all duration-300 " +
                  (i === index ? "w-6 h-2 bg-[#006EB7]" : "w-2 h-2 bg-gray-300")
                }
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

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
