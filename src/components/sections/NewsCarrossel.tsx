"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  id: string;
  image: string;
  title: string;
  href: string;
};

const VISIBLE_DESKTOP = 2;

export function NewsCarrossel({ items, instagramSlot }: { items: NewsItem[]; instagramSlot?: ReactNode }) {
  const [index, setIndex] = useState(0);

  const total      = items.length;
  const maxDesktop = Math.max(0, total - VISIBLE_DESKTOP);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxDesktop, i + 1));

  const canPrev = index > 0;
  const canNext = index < maxDesktop;

  if (total === 0 && !instagramSlot) return null;

  return (
    <section id="noticias" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className={"grid grid-cols-1 gap-10 " + (instagramSlot ? "lg:grid-cols-2 lg:gap-12" : "")}>

          {/* ── Coluna esquerda — Últimas notícias ── */}
          {total > 0 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-[#595959] md:mb-8 md:text-2xl">
                Últimas notícias
              </h2>

              <div className="relative">
                {total > VISIBLE_DESKTOP && (
                  <>
                    <button
                      onClick={prev}
                      disabled={!canPrev}
                      aria-label="Notícias anteriores"
                      className={
                        "absolute -left-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
                        (canPrev ? "opacity-100 hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]" : "opacity-30 cursor-not-allowed")
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      disabled={!canNext}
                      aria-label="Próximas notícias"
                      className={
                        "absolute -right-4 top-1/2 z-10 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-[#006EB7] transition-all " +
                        (canNext ? "opacity-100 hover:bg-[#006EB7] hover:text-white hover:border-[#006EB7]" : "opacity-30 cursor-not-allowed")
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}

                <div className="overflow-hidden">
                  <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(calc(-${index} * (100% / ${VISIBLE_DESKTOP}) - ${index} * (16px / ${VISIBLE_DESKTOP})))` }}
                  >
                    {items.map((item) => (
                      <article
                        key={item.id}
                        className="group relative shrink-0 overflow-hidden rounded-xl"
                        style={{ width: `calc(100% / ${VISIBLE_DESKTOP} - ${(16 * (VISIBLE_DESKTOP - 1)) / VISIBLE_DESKTOP}px)` }}
                      >
                        <div className="relative w-full aspect-square">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 280px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-xs font-semibold leading-snug text-white line-clamp-2 md:text-sm">
                              {item.title}
                            </h3>
                            <Link
                              href={item.href}
                              className="mt-2 inline-block text-xs font-semibold text-white underline underline-offset-2 transition-opacity hover:opacity-80"
                            >
                              Saiba mais
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/noticias"
                  className="rounded-[8px] bg-[#006EB7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
                >
                  Todas as notícias
                </Link>
              </div>
            </div>
          )}

          {/* ── Coluna direita — Últimos conteúdos (Instagram) ── */}
          {instagramSlot && (
            <div>
              <h2 className="mb-6 text-xl font-semibold text-[#595959] md:mb-8 md:text-2xl">
                Últimos conteúdos
              </h2>
              {instagramSlot}
              <div className="mt-6 flex justify-center">
                <Link
                  href="/noticias?aba=instagram"
                  className="rounded-[8px] bg-[#006EB7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
                >
                  Todos os conteúdos
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
