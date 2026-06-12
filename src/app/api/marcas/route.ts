import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — lista marcas, opcionalmente filtradas por unidade
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const unidade = searchParams.get("unidade");

  const marcas = await prisma.marca.findMany({
    where: {
      ativo: true,
      ...(unidade ? { unidades: { has: unidade } } : {}),
    },
    orderBy: { ordem: "asc" },
  });

  return NextResponse.json(marcas);
}

// POST — cria nova marca
export async function POST(req: Request) {
  const body = await req.json();
  const marca = await prisma.marca.create({
    data: {
      name:        body.name,
      logo:        body.logo,
      catalogoPdf: body.catalogoPdf ?? null,
      unidades:    body.unidades,
      ordem:       body.ordem ?? 0,
    },
  });
  return NextResponse.json(marca, { status: 201 });
}
