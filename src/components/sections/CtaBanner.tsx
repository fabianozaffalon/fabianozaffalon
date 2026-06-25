import { prisma } from "@/lib/prisma";
import { CtaBannerCarrossel } from "./CtaBannerCarrossel";

export async function CtaBanner() {
  const agora = new Date();

  const ofertas = await prisma.oferta.findMany({
    where: {
      ativo: true,
      OR: [{ validade: null }, { validade: { gt: agora } }],
    },
    orderBy: { ordem: "asc" },
    select: { id: true, titulo: true, imagem: true, link: true },
  });

  return <CtaBannerCarrossel ofertas={ofertas} />;
}
