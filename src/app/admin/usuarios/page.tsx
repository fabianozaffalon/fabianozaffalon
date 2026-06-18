"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Usuario = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  ativo: boolean;
  createdAt: string;
};

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", name: "", role: "ADMIN", ativo: true });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const carregar = () => {
    setLoading(true);
    fetch("/api/usuarios")
      .then((r) => r.json())
      .then((data) => { setUsuarios(data); setLoading(false); });
  };

  useEffect(() => { carregar(); }, []);

  const handleAdicionar = async () => {
    if (!form.email) { setErro("Email é obrigatório."); return; }
    setErro(""); setSucesso(""); setSalvando(true);
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErro(data.error ?? "Erro ao adicionar."); return; }
      setSucesso(`Usuário ${form.email} adicionado com sucesso.`);
      setForm({ email: "", name: "", role: "ADMIN", ativo: true });
      carregar();
    } catch {
      setErro("Erro inesperado.");
    } finally {
      setSalvando(false);
    }
  };

  const toggleAtivo = async (usuario: Usuario) => {
    await fetch(`/api/usuarios/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ativo: !usuario.ativo }),
    });
    carregar();
  };

  const handleDelete = async (usuario: Usuario) => {
    if (!confirm(`Excluir ${usuario.email} permanentemente?`)) return;
    await fetch(`/api/usuarios/${usuario.id}`, { method: "DELETE" });
    carregar();
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
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
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#00497F]">Gestão de Usuários</h1>
          <nav className="mt-1 flex items-center gap-2 text-xs text-[#BCBABA]">
            <Link href="/admin" className="hover:text-[#006EB7] transition-colors">Painel</Link>
            <span>/</span>
            <span className="text-[#595959]">Usuários</span>
          </nav>
          <p className="mt-2 text-sm text-[#595959]">
            Apenas usuários cadastrados aqui conseguem acessar o painel com login Google.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">

          {/* Lista de usuários */}
          <div className="overflow-hidden rounded-[16px] bg-white shadow-sm">
            <div className="border-b border-[#F6F6F6] px-6 py-4">
              <h2 className="text-sm font-semibold text-[#00497F]">Usuários cadastrados</h2>
            </div>
            {loading ? (
              <div className="px-6 py-10 text-center text-sm text-[#BCBABA]">Carregando...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#F6F6F6]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Usuário</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Perfil</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#595959]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F6F6]">
                  {usuarios.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-[#F6F6F6]/50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#1A1A1A]">{u.name ?? "—"}</p>
                        <p className="text-xs text-[#BCBABA]">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={
                          "rounded-full px-3 py-1 text-xs font-bold " +
                          (u.role === "OWNER"
                            ? "bg-[#00497F]/10 text-[#00497F]"
                            : "bg-[#006EB7]/10 text-[#006EB7]")
                        }>
                          {u.role === "OWNER" ? "Desenvolvedor" : "Administrador"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.role === "OWNER" ? (
                          <span className="text-xs text-[#BCBABA]">—</span>
                        ) : (
                          <button
                            onClick={() => toggleAtivo(u)}
                            className={
                              "rounded-full px-3 py-1 text-xs font-medium transition-colors " +
                              (u.ativo
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200")
                            }
                          >
                            {u.ativo ? "Ativo" : "Inativo"}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {u.role !== "OWNER" && (
                          <button
                            onClick={() => handleDelete(u)}
                            className="text-xs font-medium text-red-400 transition-colors hover:text-red-600"
                          >
                            Remover
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Formulário novo usuário */}
          <div className="flex flex-col gap-5 rounded-[16px] bg-white p-6 shadow-sm h-fit">
            <h2 className="text-sm font-semibold text-[#00497F]">Adicionar novo usuário</h2>

            {erro && (
              <div className="rounded-[8px] bg-red-50 px-4 py-3 text-sm text-red-600">
                {erro}
              </div>
            )}
            {sucesso && (
              <div className="rounded-[8px] bg-green-50 px-4 py-3 text-sm text-green-700">
                {sucesso}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#595959]">Email Google*</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="email@gmail.com"
                className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
              />
              <p className="text-xs text-[#BCBABA]">
                Deve ser o email Google que o usuário usará para fazer login.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#595959]">Nome <span className="font-normal text-[#BCBABA]">(opcional)</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ex: João Silva"
                className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#595959]">Perfil de acesso</label>
              <div className="flex gap-3">
                {[
                  { value: "ADMIN", label: "Administrador", desc: "Acesso ao painel" },
                ].map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setForm((p) => ({ ...p, role: r.value }))}
                    className={
                      "flex-1 rounded-[8px] border-2 px-4 py-3 text-left transition-colors " +
                      (form.role === r.value
                        ? "border-[#006EB7] bg-[#006EB7]/5"
                        : "border-[#D1D1D1] hover:border-[#006EB7]/40")
                    }
                  >
                    <p className="text-sm font-semibold text-[#00497F]">{r.label}</p>
                    <p className="text-xs text-[#595959]">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-[#595959]">Ativar imediatamente</label>
              <button
                onClick={() => setForm((p) => ({ ...p, ativo: !p.ativo }))}
                className={"relative h-6 w-11 rounded-full transition-colors " + (form.ativo ? "bg-[#006EB7]" : "bg-gray-300")}
              >
                <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (form.ativo ? "left-5" : "left-0.5")} />
              </button>
            </div>

            <div className="rounded-[8px] bg-[#F6F6F6] p-4">
              <p className="text-xs leading-relaxed text-[#595959]">
                <strong className="font-semibold">Como funciona:</strong> cadastra o email aqui e o usuário faz login normalmente com o Google em{" "}
                <span className="font-mono text-[#006EB7]">/admin/login</span>.
                Se o email não estiver cadastrado, o login será negado automaticamente.
              </p>
            </div>

            <button
              onClick={handleAdicionar}
              disabled={salvando}
              className="rounded-[8px] bg-[#006EB7] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-50"
            >
              {salvando ? "Adicionando..." : "Adicionar usuário"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
