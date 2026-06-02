"use client";

import { useState } from "react";
import Image from "next/image";
import { REGIONS, type Region } from "@/data/regions";

// ── Ícones inline ─────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.547a.75.75 0 00.921.921l5.694-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.497-5.2-1.367l-.374-.217-3.876 1.001 1.001-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
);

const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
  </svg>
);

// ── Componente ────────────────────────────────────────────────────────────────
export function RegionMap() {
  // null = nenhuma região selecionada → exibe mapa completo
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  // Toggle: clica na ativa → desativa; clica em outra → troca
  const handleToggle = (region: Region) => {
    setActiveRegion((prev) => (prev?.id === region.id ? null : region));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-14">

      {/* ── Mapa ── */}
      <div className="relative w-full overflow-hidden rounded-2xl h-52 md:h-[420px]">
        {/* Mapa completo — estado padrão */}
        <div className={"absolute inset-0 transition-opacity duration-500 " + (!activeRegion ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <Image
            src="/images/maps/mapa-completo.svg"
            alt="Mapa completo de atuação Fabiano Zaffalon"
            fill
            className="object-contain p-3 md:p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Mapas por região */}
        {REGIONS.map((region) => (
          <div
            key={region.id}
            className={"absolute inset-0 transition-opacity duration-500 " + (activeRegion?.id === region.id ? "opacity-100 z-10" : "opacity-0 z-0")}
          >
            <Image
              src={region.map}
              alt={region.mapAlt}
              fill
              className="object-contain p-3 md:p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* ── Conteúdo ── */}
      <div className="flex flex-col gap-4">

        {/* Título */}
        <h2
          className="font-semibold leading-tight text-[#737373]"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          Onde Estamos
        </h2>

        {/* Tabs — toggle */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {REGIONS.map((region) => {
            const isActive = activeRegion?.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => handleToggle(region)}
                className={
                  "flex min-h-[44px] w-full items-center justify-center rounded-[8px] border-2 px-3 py-3 text-sm font-medium transition-colors duration-200 " +
                  (isActive
                    ? "border-[#006EB7] bg-[#006EB7] text-white"
                    : "border-[#BCBABA] bg-[#BCBABA] text-white hover:border-[#006EB7] hover:bg-[#006EB7]")
                }
              >
                {region.label}
              </button>
            );
          })}
        </div>

        {/* Texto padrão — nenhuma região ativa */}
        {!activeRegion && (
          <p className="text-sm leading-relaxed text-[#595959] md:text-base">
            Temos dois centros de distribuição, 7 mil pontos de venda atendidos, milhares de entregas diárias. A Fabiano Zaffalon chega onde você precisa.
          </p>
        )}

        {/* Conteúdo da região ativa */}
        {activeRegion && (
          <>
            <p className="text-sm leading-relaxed text-[#595959] md:text-base">
              {activeRegion.description}
            </p>

            {/* Dropdown de cidades */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cities-select"
                className="text-xs font-semibold uppercase tracking-wider text-[#595959]"
              >
                Verifique as cidades atendidas da {activeRegion.label}
              </label>
              <select
                id="cities-select"
                key={activeRegion.id}
                defaultValue={activeRegion.sede}
                className="w-full rounded-[8px] border border-[#D1D1D1] bg-white px-4 py-2.5 text-sm text-[#595959] shadow-sm focus:border-[#006EB7] focus:outline-none focus:ring-1 focus:ring-[#006EB7] md:py-3"
              >
                <option value={activeRegion.sede}>📍 {activeRegion.sede} — Sede</option>
                <optgroup label="──────────────────">
                  {activeRegion.cities
                    .filter((city) => city !== activeRegion.sede)
                    .map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </optgroup>
              </select>
            </div>

            {/* Botões de contato */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <a
                href={`https://wa.me/${activeRegion.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-[#BCBABA] bg-[#BCBABA] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#006EB7] hover:bg-[#006EB7]"
              >
                <IconWhatsApp /> WhatsApp
              </a>
              <a
                href={`tel:${activeRegion.phone}`}
                className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-[#BCBABA] bg-[#BCBABA] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#006EB7] hover:bg-[#006EB7]"
              >
                <IconPhone /> Telefone
              </a>
              <a
                href={activeRegion.orderLink}
                className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-[#BCBABA] bg-[#BCBABA] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#006EB7] hover:bg-[#006EB7]"
              >
                <IconCart /> Fazer pedido
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
