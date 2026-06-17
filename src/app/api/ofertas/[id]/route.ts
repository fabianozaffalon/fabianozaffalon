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
  const oferta = await prisma.oferta.update({ where: { id }, data: body });
  return NextResponse.json(oferta);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.oferta.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
