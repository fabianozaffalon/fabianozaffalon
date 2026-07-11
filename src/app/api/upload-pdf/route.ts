import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireAdminSession } from "@/lib/auth-guard";

// IMPORTANTE: o arquivo NÃO passa mais por esta function.
// O client faz upload direto para o Blob storage usando um token assinado
// gerado aqui. Isso contorna o limite de 4.5MB de body em Serverless Functions
// da Vercel, que não é configurável via código.

export async function POST(req: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        // Validação ainda acontece aqui, antes de autorizar o upload
        if (!pathname.toLowerCase().endsWith(".pdf")) {
          throw new Error("Apenas arquivos PDF são permitidos.");
        }

        return {
          allowedContentTypes: ["application/pdf"],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024, // 50MB
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Hook opcional: rodar depois que o upload terminar
        // (ex: salvar referência no banco, se necessário)
        console.log("Upload concluído:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Erro no upload" },
      { status: 400 }
    );
  }
}
