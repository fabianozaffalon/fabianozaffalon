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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `fabianozaffalon/${pasta}`,
        resource_type: isPdf ? "raw" : "image",
        format: isPdf ? undefined : undefined,
        type: "upload",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
