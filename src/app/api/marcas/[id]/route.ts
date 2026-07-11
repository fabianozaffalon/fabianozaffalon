import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth-guard";

// GET — busca marca por ID
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const marca = await prisma.marca.findUnique({ where: { id } });
  if (!marca) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(marca);
}

// PUT — atualiza marca
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  const marca = await prisma.marca.update({ where: { id }, data: body });
  return NextResponse.json(marca);
}

// DELETE — exclui marca permanentemente
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  await prisma.marca.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
