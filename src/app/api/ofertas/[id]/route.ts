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
  let validade: Date | null | undefined = undefined;
  if ("validade" in body) {
    if (body.validade && body.validade !== "") {
      const raw = body.validade as string;
      const dateStr = raw.includes("T") ? raw.split("T")[0] : raw;
      const [y, m, d] = dateStr.split("-").map(Number);
      validade = new Date(Date.UTC(y, m - 1, d, 23, 59, 59));
    } else {
      validade = null;
    }
  }

  const data: Record<string, unknown> = { ...body };
  if (validade !== undefined) data.validade = validade;
  else delete data.validade;

  const oferta = await prisma.oferta.update({ where: { id }, data });
  return NextResponse.json(oferta);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.oferta.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
