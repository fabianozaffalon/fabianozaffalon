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
    const raw = body.validade as string;
    // Se já vier como ISO completo (ex: "2026-06-25T02:59:59.000Z"), extrai só a data
    const dateStr = raw.includes("T") ? raw.split("T")[0] : raw;
    const [y, m, d] = dateStr.split("-").map(Number);
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
