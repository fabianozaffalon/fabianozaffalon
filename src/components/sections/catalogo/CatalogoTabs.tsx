"use client";

import { useState } from "react";
import Image from "next/image";

type Marca = {
  id: string;
  name: string;
  logo: string;
  catalogoPdf: string | null;
  unidades: string[];
};

type Unidade = {
  id: string;
  label: string;
  sublabel: string;
};

export function CatalogoTabs({
  unidades,
  marcas,
  mapaMap,
}: {
  unidades: Unidade[];
  marcas: Marca[];
  mapaMap: Record<string, string>;
}) {
  const [ativa, setAtiva] = useState<Unidade>(unidades[0]);

  const marcasAtivas = marcas.filter((m) => m.unidades.includes(ativa.id));

  return (
    <>
      {/* Título + Tabs */}
      <div className="mb-10 flex flex-col items-center gap-6">
        <h2 className="text-lg font-bold text-[#006EB7]">
          Selecione a unidade:
        </h2>

        <div className="grid w-full max-w-[780px] grid-cols-3 overflow-hidden rounded-[8px] border border-[#D1D1D1]">
          {unidades.map((u, index) => (
            <button
              key={u.id}
              onClick={() => setAtiva(u)}
              className={
                "flex flex-col items-center justify-center py-3 px-2 transition-colors " +
                (ativa.id === u.id
                  ? "bg-[#00497F] text-white"
                  : "bg-[#EFEFEF] text-[#595959] hover:bg-gray-200") +
                (index < unidades.length - 1 ? " border-r border-[#D1D1D1]" : "")
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

        {/* Grid de logos — direita */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
          {marcasAtivas.length === 0 ? (
            <p className="col-span-full text-center text-sm text-[#BCBABA]">
              Nenhuma marca cadastrada para esta unidade.
            </p>
          ) : (
            marcasAtivas.map((marca) => {
              const Card = (
                <div
                  className="flex items-center justify-center rounded-[16px] bg-[#F5F5F5] transition-shadow hover:shadow-md overflow-hidden"
                  style={{ height: "131px" }}
                >
                  <Image
                    src={marca.logo}
                    alt={marca.name}
                    width={218}
                    height={131}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              );

              return marca.catalogoPdf ? (
                <a
                  key={marca.id}
                  href={marca.catalogoPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  {Card}
                </a>
              ) : (
                <div key={marca.id}>{Card}</div>
              );
            })
          )}
        </div>

      </div>
    </>
  );
}
