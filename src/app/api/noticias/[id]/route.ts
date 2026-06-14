import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { id } });
  if (!noticia) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(noticia);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const noticia = await prisma.noticia.update({ where: { id }, data: body });
  return NextResponse.json(noticia);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.noticia.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
