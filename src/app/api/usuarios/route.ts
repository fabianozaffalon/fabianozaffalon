import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }
  const usuarios = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, ativo: true, createdAt: true },
  });
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }
  const body = await req.json();

  // Verifica se já existe
  const existe = await prisma.user.findUnique({ where: { email: body.email } });
  if (existe) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
  }

  const usuario = await prisma.user.create({
    data: {
      email: body.email,
      name:  body.name ?? null,
      role:  body.role ?? "ADMIN",
      ativo: body.ativo ?? true,
    },
  });
  return NextResponse.json(usuario, { status: 201 });
}
