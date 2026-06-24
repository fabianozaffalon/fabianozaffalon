import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CaseGaleria } from "@/components/sections/cases/CaseGaleria";
import { OutrosCasesCarrossel } from "@/components/sections/cases/OutrosCasesCarrossel";
import { CtaBannerSimples } from "@/components/sections/CtaBannerSimples";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const cases = await prisma.case.findMany({
    where: { ativo: true },
    select: { slug: true },
  });
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const case_ = await prisma.case.findUnique({ where: { slug } });
  if (!case_) return { title: "Case não encontrado", robots: { index: false, follow: false } };
  return buildMetadata({
    title: case_.titulo,
    description: case_.subtitulo ?? `Conheça o case "${case_.titulo}" da Fabiano Zaffalon Distribuidora.`,
    path: `/cases/${case_.slug}`,
    type: "article",
  });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const case_ = await prisma.case.findUnique({ where: { slug } });
  if (!case_) notFound();

  // Outros cases para scroll horizontal
  const outros = await prisma.case.findMany({
    where: { ativo: true, slug: { not: slug } },
    orderBy: { ordem: "asc" },
    select: { id: true, slug: true, tag: true, titulo: true, subtitulo: true, capa: true },
  });

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#00497F] py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <span>›</span>
            <span className="text-white/80">{case_.titulo}</span>
          </nav>

          <span className="inline-block rounded-full bg-[#0084E5] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {case_.tag}
          </span>

          <h1
            className="mt-4 font-black leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {case_.titulo}
          </h1>

          {case_.subtitulo && (
            <p
              className="mt-3 font-semibold text-white/80"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
            >
              {case_.subtitulo}
            </p>
          )}

          <div className="mt-5 bg-[#0084E5]" style={{ width: "77px", height: "6px" }} />

          {case_.data && (
            <p className="mt-4 text-sm text-white/50">{case_.data}</p>
          )}
        </div>
      </section>

      {/* ── Conteúdo + foto capa ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12">

          {/* Foto capa — mesma largura do texto */}
          <div className="relative mb-10 w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "16/9" }}>
            <Image
              src={case_.capa}
              alt={case_.titulo}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 860px"
              priority
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-5">
            {case_.conteudo.split("\n\n").map((paragrafo, i) => (
              <p key={i} className="text-base leading-relaxed text-[#595959]">
                {paragrafo}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* ── Galeria — carrossel horizontal ── */}
      {case_.galeria.length > 0 && (
        <section className="bg-[#F6F6F6] py-16 md:py-20">
          <div className="mx-auto w-full max-w-[860px] px-5 md:px-12">
            <h2 className="mb-8 text-xl font-black text-[#00497F]">Galeria</h2>
            <CaseGaleria fotos={case_.galeria} titulo={case_.titulo} />
          </div>
        </section>
      )}

      {/* ── Outros cases — carrossel ── */}
      {outros.length > 0 && (
        <section className="bg-white py-14 md:py-16">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#00497F]">Outros Cases</h2>
              <Link
                href="/cases"
                className="text-sm font-semibold text-[#006EB7] underline underline-offset-2 hover:text-[#00497F] transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <OutrosCasesCarrossel items={outros} />
          </div>
        </section>
      )}

      <CtaBannerSimples />

    </main>
  );
}
