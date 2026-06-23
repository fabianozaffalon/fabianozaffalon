"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarOfertaPage() {
  const router = useRouter();
  const { id } = useParams();
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState({ titulo: "", link: "", ordem: 0, ativo: true, imagem: "", validade: "" });
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState("");

  useEffect(() => {
    fetch(`/api/ofertas/${id}`).then((r) => r.json()).then((data) => {
      setForm({
        titulo: data.titulo,
        link: data.link ?? "",
        ordem: data.ordem,
        ativo: data.ativo,
        imagem: data.imagem,
        validade: data.validade ? new Date(data.validade).toISOString().split("T")[0] : "",
      });
      setImagemPreview(data.imagem);
    });
  }, [id]);

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImagemFile(file); setImagemPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async () => {
    setSalvando(true);
    try {
      let imagemUrl = form.imagem;
      if (imagemFile) {
        const data = new FormData();
        data.append("file", imagemFile);
        data.append("pasta", "ofertas");
        const res = await fetch("/api/upload", { method: "POST", body: data });
        if (!res.ok) throw new Error("Erro no upload");
        const { url } = await res.json();
        imagemUrl = url;
      }
      await fetch(`/api/ofertas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imagem: imagemUrl,
          validade: form.validade ? new Date(form.validade + "T23:59:59-03:00").toISOString() : null,
        }),
      });
      router.push("/admin/ofertas");
    } catch (err) {
      alert("Erro ao salvar.");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza? Esta ação é permanente e remove a imagem do storage.")) return;
    await fetch(`/api/ofertas/${id}`, { method: "DELETE" });
    router.push("/admin/ofertas");
  };

  const hoje = new Date().toISOString().split("T")[0];

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
        <a href="/admin/ofertas" className="text-xs text-white/60 transition-colors hover:text-white">← Voltar</a>
      </header>

      <main className="mx-auto max-w-[720px] px-8 py-12">
        <h1 className="mb-2 text-2xl font-black text-[#00497F]">Editar Oferta</h1>
        <nav className="mb-8 flex items-center gap-2 text-xs text-[#BCBABA]">
          <a href="/admin" className="hover:text-[#006EB7]">Painel</a>
          <span>/</span>
          <a href="/admin/ofertas" className="hover:text-[#006EB7]">Ofertas</a>
          <span>/</span>
          <span className="text-[#595959]">Editar</span>
        </nav>

        <div className="flex flex-col gap-6 rounded-[20px] bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Título*</label>
            <input type="text" value={form.titulo}
              onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Imagem do encarte</label>
            {imagemPreview && (
              <div className="overflow-hidden rounded-[12px]" style={{ maxWidth: "480px" }}>
                <img src={imagemPreview} alt="Preview" className="w-full h-auto rounded-[12px]" />
              </div>
            )}
            <label className="mt-2 w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
              Trocar imagem
              <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImagem} className="hidden" />
            </label>
            {imagemFile && <p className="text-xs text-[#006EB7]">{imagemFile.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Link <span className="font-normal text-[#BCBABA]">(opcional)</span>
            </label>
            <input type="text" value={form.link}
              onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          {/* Validade */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Data de validade <span className="font-normal text-[#BCBABA]">(opcional — sem data = sempre visível)</span>
            </label>
            <div className="flex items-center gap-3">
              <input type="date" value={form.validade} min={hoje}
                onChange={(e) => setForm((p) => ({ ...p, validade: e.target.value }))}
                className="w-48 rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
              {form.validade && (
                <button onClick={() => setForm((p) => ({ ...p, validade: "" }))}
                  className="text-xs text-[#BCBABA] hover:text-red-500 transition-colors">
                  Remover validade
                </button>
              )}
            </div>
            {form.validade && (
              <p className="text-xs text-[#BCBABA]">
                Esta oferta será removida automaticamente após{" "}
                {new Date(form.validade + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Ordem de exibição</label>
            <input type="number" value={form.ordem}
              onChange={(e) => setForm((p) => ({ ...p, ordem: Number(e.target.value) }))}
              className="w-24 rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[#595959]">Ativa</label>
            <button onClick={() => setForm((p) => ({ ...p, ativo: !p.ativo }))}
              className={"relative h-6 w-11 rounded-full transition-colors " + (form.ativo ? "bg-[#006EB7]" : "bg-gray-300")}>
              <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (form.ativo ? "left-5" : "left-0.5")} />
            </button>
            <span className="text-xs text-[#BCBABA]">{form.ativo ? "Visível no site" : "Inativa"}</span>
          </div>

          <div className="flex items-center justify-between border-t border-[#F6F6F6] pt-6">
            <button onClick={handleDelete}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">
              Excluir permanentemente
            </button>
            <button onClick={handleSubmit} disabled={salvando}
              className="rounded-[8px] bg-[#006EB7] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-50">
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
