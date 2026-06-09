"use client";

import { useState } from "react";
import Image from "next/image";
import { UNIDADES_CATALOGO, type UnidadeCatalogo } from "@/data/catalogo";

const mapaMap: Record<string, string> = {
  sul: "/images/maps/sul-catalogo.svg",
  central: "/images/maps/central-catalogo.svg",
  broker: "/images/maps/broker-catalogo.svg",
};

export function CatalogoSection() {
  const [ativa, setAtiva] = useState<UnidadeCatalogo>(UNIDADES_CATALOGO[0]);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        {/* Título + Tabs */}
        <div className="mb-10 flex flex-col items-center gap-6">
          <h2 className="text-lg font-bold text-[#006EB7]">
            Selecione a unidade:
          </h2>

          <div className="grid w-full max-w-[780px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#D1D1D1]">
            {UNIDADES_CATALOGO.map((u, index) => (
              <button
                key={u.id}
                onClick={() => setAtiva(u)}
                className={
                  "flex flex-col items-center justify-center py-3 px-2 transition-colors " +
                  (ativa.id === u.id
                    ? "bg-[#00497F] text-white"
                    : "bg-[#EFEFEF] text-[#595959] hover:bg-gray-200") +
                  (index < UNIDADES_CATALOGO.length - 1
                    ? " border-r border-[#D1D1D1]"
                    : "")
                }
              >
                <span className="text-sm font-bold">{u.label}</span>
                <span
                  className={
                    "text-xs " +
                    (ativa.id === u.id ? "text-white/80" : "text-[#BCBABA]")
                  }
                >
                  {u.sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mapa + Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[420px_1fr] md:items-center md:gap-12">
          {/* Mapa — esquerda */}
          <div className="flex items-center justify-center">
            <div className="relative h-[380px] w-full md:h-[520px]">
              <Image
                src={mapaMap[ativa.id]}
                alt={`Mapa ${ativa.label}`}
                fill
                className="object-contain"
                sizes="420px"
              />
            </div>
          </div>

          {/* Grid de logos — 218x131px fiel ao Figma */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
            {ativa.marcas.map((marca) => (
              <div
                key={marca.id}
                className="flex items-center justify-center rounded-[16px] bg-[#F5F5F5] transition-shadow hover:shadow-md overflow-hidden"
                style={{ height: "131px" }}
              >
                <Image
                  src={marca.logo}
                  alt={marca.name}
                  width={218}
                  height={131}
                  className="w-full h-full object-contain p-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
