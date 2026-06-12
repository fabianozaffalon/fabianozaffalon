import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#00497F] px-8 py-4">
        <div className="flex items-center gap-4">
          <img src="/images/logo-white.svg" alt="Fabiano Zaffalon" className="w-36" />
          <span className="text-sm text-white/60">| Painel Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/80">{session.user?.email}</span>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}>
            <button className="text-xs text-white/60 transition-colors hover:text-white">
              Sair
            </button>
          </form>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <h1 className="mb-8 text-2xl font-black text-[#00497F]">
          Bem-vindo ao painel
        </h1>

        {/* Cards de módulos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/catalogo"
            className="flex flex-col gap-3 rounded-[16px] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006EB7]/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#006EB7" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#00497F]">Catálogo</h2>
            <p className="text-sm text-[#595959]">Gerenciar marcas e PDFs do catálogo</p>
          </a>
        </div>
      </main>
    </div>
  );
}
