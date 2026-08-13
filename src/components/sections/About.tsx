"use client";

import Image from "next/image";
import Link from "next/link";
import { RegionMap } from "@/components/sections/RegionMap";
import { SedeCrossfade } from "@/components/sections/SedeCrossfade";

export function About() {
  return (
    <>
      {/* ══ SEÇÃO SOBRE A EMPRESA ══════════════════════════════════════════ */}
      <section
        id="empresa"
        className="bg-[#EFEFEF] pt-12 pb-0 md:pt-20 md:pb-2"
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center md:gap-14">
            {/* Texto — esquerda */}
            <div className="flex flex-col order-1 md:order-none">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#595959]">
                A Empresa
              </p>
              <h2
                className="mt-2 font-extrabold leading-tight text-[#595959]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
              >
                Uma história de presença, consistência, confiança e resultados.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#595959] md:text-base">
                A Fabiano Zaffalon conta com um portfólio diversificado de
                marcas líderes em seus segmentos. Focada na excelência no
                atendimento e na prestação de serviços. Ao longo de nossa
                trajetória, construímos uma sólida rede de parcerias, se
                destacando pela qualidade de seus produtos e pelo prazer que
                seus colaboradores têm em fazer parte desta organização.
              </p>
              <Link
                href="/empresa"
                className="mt-5 self-start rounded-[8px] border-2 border-[#006EB7] bg-[#006EB7] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7]"
              >
                Saiba mais sobre a empresa
              </Link>
            </div>

            {/* Foto sede — direita */}
            <div className="order-2 md:order-none relative h-44 w-full overflow-hidden rounded-2xl shadow-md md:h-[360px]">
              <SedeCrossfade />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SEÇÃO BROKER NESTLÉ ════════════════════════════════════════════ */}
      <section id="broker" className="bg-[#EFEFEF] pt-10 pb-0 md:pt-16 md:pb-2">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center md:gap-14">
            {/* Foto galpão — esquerda no desktop, abaixo no mobile */}
            <div className="order-2 md:order-none relative h-44 w-full overflow-hidden rounded-2xl shadow-md md:h-[360px]">
              <Image
                src="/images/empresa/broker.jpg"
                alt="Operação Broker Nestlé — Fabiano Zaffalon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Texto — direita */}
            <div className="flex flex-col order-1 md:order-none">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#595959]">
                Broker Nestlé
              </p>
              <h2
                className="mt-2 font-extrabold leading-tight text-[#595959]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
              >
                Conectando negócios a uma das marcas mais desejadas do mercado
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#595959] md:text-base">
                Por meio da operação de Broker Nestlé, atuamos como uma extensão
                estratégica de uma das marcas mais prestigiadas do mundo,
                fortalecendo sua presença no mercado com capilaridade e
                ampliando oportunidades para o varejo e food service.
              </p>
              <Link
                href="/broker-nestle"
                className="mt-5 self-start rounded-[8px] border-2 border-[#006EB7] bg-[#006EB7] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7]"
              >
                Saiba mais sobre o Broker Nestlé
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SEÇÃO REGIÕES DE ATUAÇÃO — usa RegionMap reutilizável ══════════ */}
      <section
        id="regioes"
        className="bg-[#EFEFEF] pt-2 pb-10 md:pt-4 md:pb-14"
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <RegionMap />
        </div>
      </section>
    </>
  );
}
