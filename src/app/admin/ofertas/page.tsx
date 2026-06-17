import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminOfertasPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const ofertas = await prisma.oferta.findMany({
    orderBy: { ordem: "asc" },
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
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[8px] border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Ver site
          </a>
          <Link href="/admin" className="text-xs text-white/60 transition-colors hover:text-white">← Voltar</Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#00497F]">Ofertas do Mês</h1>
            <nav className="mt-1 flex items-center gap-2 text-xs text-[#BCBABA]">
              <Link href="/admin" className="hover:text-[#006EB7] transition-colors">Painel</Link>
              <span>/</span>
              <span className="text-[#595959]">Ofertas</span>
            </nav>
          </div>
          <Link href="/admin/ofertas/nova"
            className="rounded-[8px] bg-[#006EB7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]">
            + Nova oferta
          </Link>
        </div>

        <div className="overflow-hidden rounded-[16px] bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#F6F6F6]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Imagem</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Título</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Ordem</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F6F6]">
              {ofertas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#BCBABA]">
                    Nenhuma oferta cadastrada ainda.
                  </td>
                </tr>
              ) : (
                ofertas.map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-[#F6F6F6]/50">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-20 overflow-hidden rounded-[6px]">
                        <img src={o.imagem} alt={o.titulo} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#595959]">{o.titulo}</td>
                    <td className="px-6 py-4 text-sm text-[#595959]">{o.ordem}</td>
                    <td className="px-6 py-4">
                      <span className={"rounded-full px-3 py-1 text-xs font-medium " +
                        (o.ativo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                        {o.ativo ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/ofertas/${o.id}`}
                        className="text-xs font-medium text-[#006EB7] transition-colors hover:text-[#00497F]">
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
