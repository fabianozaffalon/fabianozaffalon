import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Cases & Conquistas",
  description:
    "Conheça os principais marcos da história da Fabiano Zaffalon Distribuidora.",
  path: "/cases",
});

export default async function CasesPage() {
  const cases = await prisma.case.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });

  return (
    <main className="bg-white">
      {/* Hero simples */}
      <section className="bg-[#00497F] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0084E5]">
            Nossa História
          </p>
          <h1
            className="font-black leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Cases & Conquistas
          </h1>
          <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-white/80 md:text-base">
            Momentos que marcaram a trajetória da Fabiano Zaffalon. Conquistas
            construídas com trabalho, estratégia e comprometimento ao longo de
            quase 30 anos de história.
          </p>
        </div>
      </section>

      {/* Grid de cases */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          {cases.length === 0 ? (
            <p className="text-center text-sm text-[#BCBABA]">
              Nenhum case publicado ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Foto */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={c.capa}
                      alt={c.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col gap-3 p-6">
                    <span className="w-fit rounded-full bg-[#0084E5]/10 px-3 py-1 text-xs font-bold text-[#0084E5]">
                      {c.tag}
                    </span>
                    <h2 className="text-base font-black leading-snug text-[#00497F] line-clamp-2">
                      {c.titulo}
                    </h2>
                    {c.subtitulo && (
                      <p className="text-sm text-[#595959] line-clamp-2">
                        {c.subtitulo}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      {c.data && (
                        <span className="text-xs text-[#BCBABA]">{c.data}</span>
                      )}
                      <span className="ml-auto text-xs font-bold text-[#006EB7] underline underline-offset-2">
                        Saiba mais →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
