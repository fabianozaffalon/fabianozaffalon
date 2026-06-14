import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — lista notícias publicadas, mais nova primeiro
export async function GET() {
  const noticias = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      categoria: true,
      titulo: true,
      resumo: true,
      capa: true,
      createdAt: true,
    },
  });
  return NextResponse.json(noticias);
}

// POST — cria nova notícia
export async function POST(req: Request) {
  const body = await req.json();
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
    },
  });
  return NextResponse.json(noticia, { status: 201 });
}
