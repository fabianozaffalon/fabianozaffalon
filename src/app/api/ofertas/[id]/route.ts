import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const oferta = await prisma.oferta.findUnique({ where: { id } });
  if (!oferta) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(oferta);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Converte string "2026-06-23" para fim do dia em UTC
  let validade: Date | null = null;
  if (body.validade) {
    const [y, m, d] = (body.validade as string).split("-").map(Number);
    validade = new Date(Date.UTC(y, m - 1, d, 23, 59, 59));
  }

  const oferta = await prisma.oferta.update({
    where: { id },
    data: {
      titulo:   body.titulo,
      imagem:   body.imagem,
      link:     body.link ?? null,
      ordem:    body.ordem ?? 0,
      ativo:    body.ativo ?? true,
      validade,
    },
  });
  return NextResponse.json(oferta);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.oferta.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
