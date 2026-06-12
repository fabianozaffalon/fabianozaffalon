import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  if (!file.type.includes("pdf")) {
    return NextResponse.json({ error: "Apenas arquivos PDF são permitidos." }, { status: 400 });
  }

  // Limite generoso — Vercel Blob suporta arquivos grandes
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo permitido: 50MB.` },
      { status: 400 }
    );
  }

  try {
    const blob = await put(`catalogos/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Erro no upload" },
      { status: 500 }
    );
  }
}
