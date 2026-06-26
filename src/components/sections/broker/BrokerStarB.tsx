"use client";

import { useState } from "react";
import Image from "next/image";

export function BrokerStarB() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* Esquerda — logo + texto */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <Image
              src="/images/broker/starb-logo.png"
              alt="Star B Nestlé — Programa de Excelência 20 anos"
              width={220}
              height={80}
              className="h-auto w-auto max-w-[220px] object-contain"
            />
            <p className="text-sm leading-relaxed text-[#595959]">
              O Star B é uma importante premiação nacional promovida pela Nestlé
              para reconhecer os brokers que mais se destacam em desempenho,
              execução e geração de resultados. Nos últimos anos, a Broker
              Fabiano Zaffalon tem figurado entre os melhores brokers do país,
              conquistando inclusive o Top 1 no Star B e reforçando sua
              capacidade de transformar planejamento em resultados concretos. Um
              reconhecimento que evidencia a qualidade da nossa equipe, a força
              da nossa operação e o compromisso permanente com a evolução e a
              excelência na representação da marca Nestlé.
            </p>
          </div>

          {/* Direita — vídeo Star B */}
          <div
            className="relative w-full overflow-hidden rounded-[16px]"
            style={{ aspectRatio: "16/9" }}
          >
            {!playing ? (
              <>
                <Image
                  src="/images/broker/video-thumb-starb.jpg"
                  alt="Vídeo Star B Nestlé — Broker Fabiano Zaffalon"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="Reproduzir vídeo Star B"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#006EB7"
                      className="h-8 w-8 translate-x-0.5"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/F4KURmu2p6A?autoplay=1"
                title="Vídeo Star B Nestlé"
                allow="autoplay; fullscreen"
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
