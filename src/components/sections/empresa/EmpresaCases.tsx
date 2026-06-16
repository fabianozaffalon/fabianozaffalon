import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { EmpresaCasesCarrossel } from "./EmpresaCasesCarrossel";

export async function EmpresaCases() {
  const cases = await prisma.case.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
    take: 6,
    select: {
      id: true,
      slug: true,
      tag: true,
      titulo: true,
      subtitulo: true,
      capa: true,
    },
  });

  const items = cases.map((c) => ({
    id:       c.id,
    slug:     c.slug,
    tag:      c.tag,
    titulo:   c.titulo,
    subtitulo: c.subtitulo,
    capa:     c.capa,
  }));

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 md:items-center">

          {/* Título + texto + botão — esquerda */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Cases de
              <br />crescimento
            </h2>
            <p className="text-sm leading-relaxed text-[#595959] md:text-base">
              A nossa história é contada também por alguns casos de sucesso. Confira
              e descubra como a Fabiano Zaffalon transforma desafio em resultado.
            </p>
            <Link
              href="/cases"
              className="self-start rounded-[8px] border-2 border-[#006EB7] px-6 py-2.5 text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#006EB7] hover:text-white"
            >
              Ver todos os cases →
            </Link>
          </div>

          {/* Carrossel — direita */}
          <EmpresaCasesCarrossel items={items} />

        </div>
      </div>
    </section>
  );
}
