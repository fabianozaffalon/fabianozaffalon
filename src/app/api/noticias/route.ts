import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth-guard";

// GET — lista notícias publicadas, ordem manual + mais nova primeiro
export async function GET() {
  const noticias = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: [{ ordem: "asc" }, { publishedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      categoria: true,
      titulo: true,
      resumo: true,
      capa: true,
      publishedAt: true,
      ordem: true,
    },
  });
  return NextResponse.json(noticias);
}

// POST — cria nova notícia
export async function POST(req: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await req.json();

  // "Data de publicação" vem do form como "YYYY-MM-DD" — grava ao meio-dia UTC
  // para nunca cruzar fronteira de dia em nenhum fuso horário na exibição.
  let publishedAt: Date | undefined;
  if (typeof body.publishedAt === "string" && body.publishedAt) {
    const raw = body.publishedAt as string;
    const dateStr = raw.includes("T") ? raw.split("T")[0] : raw;
    const [y, m, d] = dateStr.split("-").map(Number);
    publishedAt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  }

  const noticia = await prisma.noticia.create({
    data: {
      slug:      body.slug,
      categoria: body.categoria,
      titulo:    body.titulo,
      resumo:    body.resumo,
      conteudo:  body.conteudo,
      capa:      body.capa,
      fotos:     body.fotos ?? [],
      publicada: body.publicada ?? true,
      ordem:     body.ordem ?? 0,
      ...(publishedAt ? { publishedAt } : {}),
    },
  });
  revalidatePath("/noticias");
  revalidatePath(`/noticias/${noticia.slug}`);
  revalidatePath("/");
  return NextResponse.json(noticia, { status: 201 });
}
