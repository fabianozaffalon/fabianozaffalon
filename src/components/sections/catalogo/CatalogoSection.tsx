"use client";

import { useState } from "react";
import Image from "next/image";
import { UNIDADES_CATALOGO, type UnidadeCatalogo } from "@/data/catalogo";
import { REGIONS } from "@/data/regions";

export function CatalogoSection() {
  const [ativa, setAtiva] = useState<UnidadeCatalogo>(UNIDADES_CATALOGO[0]);

  // Mapa correspondente à unidade ativa
  const mapaMap: Record<string, string> = {
    sul:     "/images/maps/mapa-sul.svg",
    central: "/images/maps/mapa-central.svg",
    broker:  "/images/maps/mapa-broker.svg",
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

        {/* Título + Tabs */}
        <div className="mb-10 flex flex-col items-center gap-6">
          <h2 className="text-lg font-semibold text-[#595959]">
            Selecione a unidade:
          </h2>

          {/* Tabs — 3 botões com label + sublabel */}
          <div className="grid w-full max-w-[780px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#D1D1D1]">
            {UNIDADES_CATALOGO.map((u, index) => (
              <button
                key={u.id}
                onClick={() => setAtiva(u)}
                className={
                  "flex flex-col items-center justify-center py-3 px-2 transition-colors " +
                  (ativa.id === u.id
                    ? "bg-[#006EB7] text-white"
                    : "bg-white text-[#595959] hover:bg-gray-50") +
                  (index < UNIDADES_CATALOGO.length - 1 ? " border-r border-[#D1D1D1]" : "")
                }
              >
                <span className="text-sm font-bold">{u.label}</span>
                <span className={
                  "text-xs " + (ativa.id === u.id ? "text-white/80" : "text-[#BCBABA]")
                }>
                  {u.sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mapa + Grid de logos */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:items-start md:gap-12">

          {/* Mapa — esquerda */}
          <div className="flex items-center justify-center">
            <div className="relative h-[320px] w-full md:h-[420px]">
              <Image
                src={mapaMap[ativa.id]}
                alt={`Mapa ${ativa.label}`}
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
          </div>

          {/* Grid de logos — direita */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
            {ativa.marcas.map((marca) => (
              <div
                key={marca.id}
                className="flex items-center justify-center rounded-[12px] border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                style={{ minHeight: "110px" }}
              >
                <Image
                  src={marca.logo}
                  alt={marca.name}
                  width={160}
                  height={80}
                  className={
                    "w-auto object-contain " +
                    (marca.size === "lg"
                      ? "h-16 max-w-[160px]"
                      : "h-12 max-w-[140px]")
                  }
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
