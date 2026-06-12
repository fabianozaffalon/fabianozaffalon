import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminCatalogoPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const marcas = await prisma.marca.findMany({
    orderBy: [{ unidades: "asc" }, { ordem: "asc" }],
  });

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#00497F] px-8 py-4">
        <div className="flex items-center gap-4">
          <img src="/images/logo-white.svg" alt="Fabiano Zaffalon" className="w-36" />
          <span className="text-sm text-white/60">| Painel Admin</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/admin" className="text-xs text-white/60 hover:text-white transition-colors">
            ← Voltar
          </a>
          <span className="text-sm text-white/80">{session.user?.email}</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#00497F]">Catálogo de Marcas</h1>
          <a
            href="/admin/catalogo/nova"
            className="rounded-[8px] bg-[#006EB7] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
          >
            + Nova marca
          </a>
        </div>

        {/* Tabs por unidade */}
        {["sul", "central", "broker"].map((unidade) => {
          const marcasUnidade = marcas.filter((m) => m.unidades.includes(unidade));
          const label = unidade === "sul" ? "Região Sul" : unidade === "central" ? "Região Central" : "Broker Nestlé";

          return (
            <div key={unidade} className="mb-10">
              <h2 className="mb-4 text-lg font-bold text-[#595959]">{label}</h2>
              <div className="overflow-hidden rounded-[16px] bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-[#F6F6F6]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Logo</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">PDF Catálogo</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F6F6F6]">
                    {marcasUnidade.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-[#BCBABA]">
                          Nenhuma marca cadastrada
                        </td>
                      </tr>
                    ) : (
                      marcasUnidade.map((marca) => (
                        <tr key={marca.id} className="hover:bg-[#F6F6F6]/50 transition-colors">
                          <td className="px-6 py-4">
                            <img
                              src={marca.logo}
                              alt={marca.name}
                              className="h-10 w-auto max-w-[100px] object-contain"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#595959]">
                            {marca.name}
                          </td>
                          <td className="px-6 py-4">
                            {marca.catalogoPdf ? (
                              <a
                                href={marca.catalogoPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-[#006EB7] underline underline-offset-2 hover:text-[#00497F]"
                              >
                                Ver PDF
                              </a>
                            ) : (
                              <span className="text-xs text-[#BCBABA]">Sem PDF</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={
                              "rounded-full px-3 py-1 text-xs font-medium " +
                              (marca.ativo
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600")
                            }>
                              {marca.ativo ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`/admin/catalogo/${marca.id}`}
                              className="text-xs font-medium text-[#006EB7] hover:text-[#00497F] transition-colors"
                            >
                              Editar
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
