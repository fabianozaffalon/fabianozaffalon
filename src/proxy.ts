import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const pathname = req.nextUrl.pathname;

  // Rotas de API administrativas (Marcas, Ofertas, Notícias, Cases, uploads)
  // — não fazem parte do fluxo de páginas /admin, então respondem 401 JSON
  // em vez de redirecionar.
  if (!pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const isUsuariosPage = pathname.startsWith("/admin/usuarios");

  // Não logado — redireciona para login
  if (!isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Já logado tentando acessar login — vai para painel
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Página de usuários — só OWNER
  if (isUsuariosPage && session?.user?.role !== "OWNER") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/marcas/:path*",
    "/api/ofertas/:path*",
    "/api/noticias/:path*",
    "/api/cases/:path*",
    "/api/upload/:path*",
    "/api/upload-pdf/:path*",
  ],
};
