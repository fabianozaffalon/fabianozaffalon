import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth-guard";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { id } });
  if (!noticia) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(noticia);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = { ...body };

  // "Data de publicação" vem do form como "YYYY-MM-DD" — grava ao meio-dia UTC
  // para nunca cruzar fronteira de dia em nenhum fuso horário na exibição.
  if (typeof body.publishedAt === "string" && body.publishedAt) {
    const raw = body.publishedAt as string;
    const dateStr = raw.includes("T") ? raw.split("T")[0] : raw;
    const [y, m, d] = dateStr.split("-").map(Number);
    data.publishedAt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  }

  const noticia = await prisma.noticia.update({ where: { id }, data });
  revalidatePath("/noticias");
  revalidatePath(`/noticias/${noticia.slug}`);
  revalidatePath("/");
  return NextResponse.json(noticia);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { id }, select: { slug: true } });
  await prisma.noticia.delete({ where: { id } });
  revalidatePath("/noticias");
  if (noticia) revalidatePath(`/noticias/${noticia.slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
