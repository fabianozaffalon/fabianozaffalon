import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Ofertas do Mês",
  description: "Confira as ofertas e ações promocionais vigentes da Fabiano Zaffalon Distribuidora.",
};

export default async function OfertasPage() {
  const ofertas = await prisma.oferta.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#00497F] py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0084E5]">
            Promoções vigentes
          </p>
          <h1
            className="font-black leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Ofertas do Mês
          </h1>
          <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/80 md:text-base">
            Acompanhe as ações promocionais e os destaques de cada mês.
            Entre em contato com seu consultor para aproveitar as oportunidades.
          </p>
        </div>
      </section>

      {/* Grid de encartes */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          {ofertas.length === 0 ? (
            <p className="text-center text-sm text-[#BCBABA]">
              Nenhuma oferta disponível no momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {ofertas.map((o) => (
                <div key={o.id} className="flex flex-col overflow-hidden rounded-[16px] border border-gray-100 shadow-sm">

                  {/* Desktop — imagem */}
                  <div className="hidden md:block relative w-full overflow-hidden" style={{ aspectRatio: "1080/618" }}>
                    <Image
                      src={o.imagem}
                      alt={o.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 50vw, 600px"
                    />
                  </div>

                  {/* Mobile — card de download */}
                  <div className="flex md:hidden items-center gap-4 bg-[#F6F6F6] p-5">
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[8px]">
                      <Image
                        src={o.imagem}
                        alt={o.titulo}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-[#00497F]">{o.titulo}</p>
                      <p className="text-xs text-[#595959]">Toque para baixar o encarte completo</p>
                    </div>
                    <a
                      href={o.imagem}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#006EB7] text-white transition-colors hover:bg-[#00497F]"
                      aria-label={`Baixar encarte ${o.titulo}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                  </div>

                  {/* Rodapé do card */}
                  <div className="flex items-center justify-between border-t border-gray-100 bg-white px-5 py-4">
                    <p className="text-sm font-semibold text-[#00497F]">{o.titulo}</p>
                    <div className="flex items-center gap-3">
                      {/* Download desktop */}
                      <a
                        href={o.imagem}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#595959] transition-colors hover:text-[#006EB7]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Baixar encarte
                      </a>
                      {o.link && (
                        <Link
                          href={o.link}
                          className="rounded-[8px] bg-[#006EB7] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#00497F]"
                        >
                          Ver mais
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F6F6F6] py-14 md:py-16">
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
    </main>
  );
}
