import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const oferta = await prisma.oferta.findUnique({ where: { id } });
  if (!oferta) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(oferta);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  let validade: Date | null | undefined = undefined;
  if ("validade" in body) {
    if (body.validade && body.validade !== "") {
      const raw = body.validade as string;
      const dateStr = raw.includes("T") ? raw.split("T")[0] : raw;
      const [y, m, d] = dateStr.split("-").map(Number);
      // Início do dia seguinte em UTC — evita que o fuso (BRT = UTC-3) corte a validade antes da meia-noite local.
      validade = new Date(Date.UTC(y, m - 1, d + 1, 0, 0, 0));
    } else {
      validade = null;
    }
  }

  const data: Record<string, unknown> = { ...body };
  if (validade !== undefined) data.validade = validade;
  else delete data.validade;

  const oferta = await prisma.oferta.update({ where: { id }, data });

  revalidatePath("/ofertas");
  revalidatePath("/");

  return NextResponse.json(oferta);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.oferta.delete({ where: { id } });

  revalidatePath("/ofertas");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
