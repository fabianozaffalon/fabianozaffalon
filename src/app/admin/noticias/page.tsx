import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

function formatarData(date: Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function AdminNoticiasPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const noticias = await prisma.noticia.findMany({
    orderBy: [{ ordem: "asc" }, { publishedAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <header className="flex items-center justify-between bg-[#00497F] px-8 py-4">
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
          <Link href="/admin" className="text-xs text-white/60 transition-colors hover:text-white">← Voltar</Link>
          <span className="text-sm text-white/70">{session.user?.email}</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#00497F]">Notícias</h1>
            <nav className="mt-1 flex items-center gap-2 text-xs text-[#BCBABA]">
              <Link href="/admin" className="hover:text-[#006EB7] transition-colors">Painel</Link>
              <span>/</span>
              <span className="text-[#595959]">Notícias</span>
            </nav>
          </div>
          <Link
            href="/admin/noticias/nova"
            className="rounded-[8px] bg-[#006EB7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
          >
            + Nova notícia
          </Link>
        </div>

        <div className="overflow-hidden rounded-[16px] bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#F6F6F6]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Capa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Título</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F6F6]">
              {noticias.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#BCBABA]">
                    Nenhuma notícia cadastrada ainda.
                  </td>
                </tr>
              ) : (
                noticias.map((n) => (
                  <tr key={n.id} className="transition-colors hover:bg-[#F6F6F6]/50">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-20 overflow-hidden rounded-[6px]">
                        <img
                          src={n.capa}
                          alt={n.titulo}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#595959] max-w-[280px]">
                      <p className="line-clamp-2">{n.titulo}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#595959]">{n.categoria}</td>
                    <td className="px-6 py-4 text-sm text-[#BCBABA] whitespace-nowrap">{formatarData(n.publishedAt)}</td>
                    <td className="px-6 py-4">
                      <span className={
                        "rounded-full px-3 py-1 text-xs font-medium " +
                        (n.publicada ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")
                      }>
                        {n.publicada ? "Publicada" : "Rascunho"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/noticias/${n.id}`}
                        className="text-xs font-medium text-[#006EB7] transition-colors hover:text-[#00497F]"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
