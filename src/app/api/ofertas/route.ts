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
  const oferta = await prisma.oferta.create({
    data: {
      titulo:  body.titulo,
      imagem:  body.imagem,
      link:    body.link ?? null,
      ordem:   body.ordem ?? 0,
      ativo:   body.ativo ?? true,
    },
  });
  return NextResponse.json(oferta, { status: 201 });
}
