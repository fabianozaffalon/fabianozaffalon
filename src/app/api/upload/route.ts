import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const pasta = formData.get("pasta") as string ?? "catalogo";

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");

  // Limite do plano gratuito Cloudinary: 10MB para raw (PDF)
  const MAX_SIZE = 10 * 1024 * 1024;
  if (isPdf && file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `PDF muito grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo permitido: 10MB. Comprime o arquivo antes de enviar.` },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `fabianozaffalon/${pasta}`,
          resource_type: isPdf ? "raw" : "image",
          type: "upload",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Erro no upload" },
      { status: 500 }
    );
  }
}
