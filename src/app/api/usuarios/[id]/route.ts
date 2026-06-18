import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }
  const { id } = await params;
  const body = await req.json();

  // Não permite alterar o próprio usuário via API
  const usuario = await prisma.user.findUnique({ where: { id } });
  if (usuario?.email === session.user?.email) {
    return NextResponse.json({ error: "Não podes alterar teu próprio usuário aqui" }, { status: 400 });
  }

  const atualizado = await prisma.user.update({ where: { id }, data: body });
  return NextResponse.json(atualizado);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }
  const { id } = await params;

  const usuario = await prisma.user.findUnique({ where: { id } });
  if (usuario?.email === session.user?.email) {
    return NextResponse.json({ error: "Não podes excluir teu próprio usuário" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
