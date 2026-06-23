import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ofertas = await prisma.oferta.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });
  return NextResponse.json(ofertas);
}

export async function POST(req: Request) {
  const body = await req.json();

  // Converte string "2026-06-23" para fim do dia em UTC
  let validade: Date | null = null;
  if (body.validade) {
    const [y, m, d] = (body.validade as string).split("-").map(Number);
    validade = new Date(Date.UTC(y, m - 1, d, 23, 59, 59));
  }

  const oferta = await prisma.oferta.create({
    data: {
      titulo:   body.titulo,
      imagem:   body.imagem,
      link:     body.link ?? null,
      ordem:    body.ordem ?? 0,
      ativo:    body.ativo ?? true,
      validade,
    },
  });
  return NextResponse.json(oferta, { status: 201 });
}
