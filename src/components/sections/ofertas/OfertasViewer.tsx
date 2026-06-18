"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Oferta = {
  id: string;
  titulo: string;
  imagem: string;
  link: string | null;
  createdAt: Date;
};

export function OfertasViewer({ ofertas }: { ofertas: Oferta[] }) {
  const [selected, setSelected] = useState(0);

  if (ofertas.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-sm text-[#BCBABA]">Nenhuma oferta disponível no momento.</p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[#006EB7] underline underline-offset-2">
          Voltar ao início
        </Link>
      </section>
    );
  }

  const oferta = ofertas[selected];

  return (
    <>
      {/* ── Oferta principal ── */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

          {/* Cabeçalho da oferta */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0084E5]">
                Oferta em destaque
              </span>
              <h2 className="text-lg font-black text-[#00497F] md:text-xl">
                {oferta.titulo}
              </h2>
            </div>
            {/* Botão download */}
            <a
              href={oferta.imagem}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[8px] border-2 border-[#006EB7] px-4 py-2 text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#006EB7] hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="hidden sm:inline">Baixar encarte</span>
              <span className="sm:hidden">Baixar</span>
            </a>
          </div>

          {/* Imagem principal — centralizada, máximo possível */}
          <div
            className="mx-auto w-full overflow-hidden rounded-[16px] shadow-lg transition-opacity duration-300"
            style={{ maxWidth: "900px" }}
          >
            <Image
              key={oferta.id}
              src={oferta.imagem}
              alt={oferta.titulo}
              width={1080}
              height={618}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>

          {/* Link opcional */}
          {oferta.link && (
            <div className="mt-5 flex justify-center">
              <Link
                href={oferta.link}
                className="inline-flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
              >
                Saiba mais sobre esta oferta
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* ── Carrossel de outras ofertas ── */}
      {ofertas.length > 1 && (
        <section className="bg-[#F6F6F6] py-10 md:py-14">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
            <h3 className="mb-6 text-base font-semibold text-[#595959]">
              Outras ofertas
            </h3>

            {/* Desktop — grid responsivo */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ofertas.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => { setSelected(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={
                    "group flex flex-col overflow-hidden rounded-[12px] border-2 transition-all text-left " +
                    (i === selected
                      ? "border-[#006EB7] shadow-md"
                      : "border-transparent bg-white shadow-sm hover:border-[#006EB7]/40 hover:shadow-md")
                  }
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1080/618" }}>
                    <Image
                      src={o.imagem}
                      alt={o.titulo}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1280px) 25vw, 280px"
                    />
                    {i === selected && (
                      <div className="absolute inset-0 bg-[#006EB7]/20 flex items-center justify-center">
                        <span className="rounded-full bg-[#006EB7] px-3 py-1 text-xs font-bold text-white">
                          Em exibição
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-[#00497F] line-clamp-1">{o.titulo}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile — scroll horizontal */}
            <div className="flex gap-3 overflow-x-auto pb-2 md:hidden">
              {ofertas.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => { setSelected(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={
                    "shrink-0 flex flex-col overflow-hidden rounded-[12px] border-2 transition-all text-left " +
                    (i === selected ? "border-[#006EB7]" : "border-transparent bg-white shadow-sm")
                  }
                  style={{ width: "180px" }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1080/618" }}>
                    <Image
                      src={o.imagem}
                      alt={o.titulo}
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                    {i === selected && (
                      <div className="absolute inset-0 bg-[#006EB7]/20 flex items-center justify-center">
                        <span className="rounded-full bg-[#006EB7] px-2 py-0.5 text-xs font-bold text-white">
                          Atual
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-[#00497F] line-clamp-1">{o.titulo}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12 text-center">
          <h2 className="text-xl font-black text-[#00497F] md:text-2xl">
            Quer aproveitar essas ofertas?
          </h2>
          <p className="mt-2 text-sm text-[#595959]">
            Entre em contato com o consultor da sua região.
          </p>
          <Link
            href="/contato"
            className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
          >
            Fale com um consultor
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
