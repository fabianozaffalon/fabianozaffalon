import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth-guard";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const case_ = await prisma.case.findUnique({ where: { id } });
  if (!case_) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(case_);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  const case_ = await prisma.case.update({ where: { id }, data: body });

  revalidatePath("/cases");
  revalidatePath(`/cases/${case_.slug}`);
  revalidatePath("/empresa");
  revalidatePath("/industria");

  return NextResponse.json(case_);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const case_ = await prisma.case.delete({ where: { id } });

  revalidatePath("/cases");
  revalidatePath(`/cases/${case_.slug}`);
  revalidatePath("/empresa");
  revalidatePath("/industria");

  return NextResponse.json({ ok: true });
}
