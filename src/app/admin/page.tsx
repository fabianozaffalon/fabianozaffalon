import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header */}
      <header className="bg-[#00497F] px-8 py-4">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Painel Administrativo</span>
              <p className="text-xs text-white/50">Fabiano Zaffalon</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-white/70 sm:inline">{session.user?.email}</span>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}>
              <button className="flex items-center gap-1.5 rounded-[8px] border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <h1 className="mb-8 text-2xl font-black text-[#00497F]">Bem-vindo ao painel</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Catálogo */}
          <a href="/admin/catalogo"
            className="flex flex-col gap-3 rounded-[16px] bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006EB7]/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#006EB7" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#00497F]">Catálogo</h2>
            <p className="text-sm text-[#595959]">Gerenciar marcas e PDFs do catálogo</p>
          </a>

          {/* Notícias */}
          <a href="/admin/noticias"
            className="flex flex-col gap-3 rounded-[16px] bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006EB7]/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#006EB7" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#00497F]">Notícias</h2>
            <p className="text-sm text-[#595959]">Publicar e gerenciar notícias do site</p>
          </a>

        </div>
      </main>
    </div>
  );
}
