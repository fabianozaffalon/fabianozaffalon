import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth-guard";

export async function GET() {
  const cases = await prisma.case.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
    select: {
      id: true,
      slug: true,
      tag: true,
      titulo: true,
      subtitulo: true,
      capa: true,
      ordem: true,
      data: true,
    },
  });
  return NextResponse.json(cases);
}

export async function POST(req: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await req.json();
  const case_ = await prisma.case.create({
    data: {
      slug:      body.slug,
      tag:       body.tag ?? "Case de Crescimento",
      titulo:    body.titulo,
      subtitulo: body.subtitulo ?? null,
      conteudo:  body.conteudo,
      capa:      body.capa,
      galeria:   body.galeria ?? [],
      ordem:     body.ordem ?? 0,
      data:      body.data ?? null,
      ativo:     body.ativo ?? true,
    },
  });

  revalidatePath("/cases");
  revalidatePath(`/cases/${case_.slug}`);
  revalidatePath("/empresa");
  revalidatePath("/industria");

  return NextResponse.json(case_, { status: 201 });
}
