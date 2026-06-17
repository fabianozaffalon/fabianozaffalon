import { prisma } from "@/lib/prisma";
import { CtaBannerCarrossel } from "./CtaBannerCarrossel";

export async function CtaBanner() {
  const ofertas = await prisma.oferta.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
    select: { id: true, titulo: true, imagem: true, link: true },
  });

  return <CtaBannerCarrossel ofertas={ofertas} />;
}
