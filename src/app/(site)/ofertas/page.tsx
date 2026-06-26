import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { OfertasViewer } from "@/components/sections/ofertas/OfertasViewer";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Ofertas do Mês",
  description: "Confira as ofertas e ações promocionais vigentes da Fabiano Zaffalon Distribuidora.",
  path: "/ofertas",
});

export default async function OfertasPage() {
  const agora = new Date();

  const ofertas = await prisma.oferta.findMany({
    where: {
      ativo: true,
      OR: [
        { validade: null },
        { validade: { gt: agora } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-white">
      <section className="bg-[#00497F] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0084E5]">
            Promoções vigentes
          </p>
          <h1 className="font-black leading-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Ofertas do Mês
          </h1>
          <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-white/80 md:text-base">
            Acompanhe as ações promocionais e os destaques de cada mês.
            Entre em contato com seu consultor para aproveitar as oportunidades.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <OfertasViewer ofertas={ofertas} />
      </Suspense>
    </main>
  );
}
