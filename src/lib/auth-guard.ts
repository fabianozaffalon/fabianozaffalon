import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Defesa redundante ao proxy.ts — garante que a rota continua protegida
 * mesmo que o matcher do proxy seja alterado/quebrado no futuro.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Não autenticado" }, { status: 401 }),
    } as const;
  }
  return { session, response: null } as const;
}
