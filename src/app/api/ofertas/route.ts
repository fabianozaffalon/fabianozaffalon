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
  if (body.validade && body.validade !== "") {
    console.log("[debug] validade recebida:", body.validade);
    const parts = (body.validade as string).split("-").map(Number);
    console.log("[debug] parts:", parts);
    const [y, m, d] = parts;
    validade = new Date(Date.UTC(y, m - 1, d, 23, 59, 59));
    console.log("[debug] validade convertida:", validade);
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
