"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type FotoEntry = { file: File; preview: string };

export default function NovaNoticiaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    categoria: "",
    resumo: "",
    conteudo: "",
    publicada: true,
    publishedAt: hoje,
    ordem: 0,
  });
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState("");
  const [fotosEntries, setFotosEntries] = useState<FotoEntry[]>([]);
  const fotosInputRef = useRef<HTMLInputElement>(null);

  const gerarSlug = (titulo: string) =>
    titulo
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const handleTitulo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titulo = e.target.value;
    setForm((p) => ({ ...p, titulo, slug: gerarSlug(titulo) }));
  };

  const handleCapa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapaFile(file);
      setCapaPreview(URL.createObjectURL(file));
    }
  };

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novosArquivos = Array.from(e.target.files ?? []);
    e.target.value = ""; // reset para permitir re-seleção do mesmo arquivo
    if (novosArquivos.length === 0) return;

    setFotosEntries((prev) => {
      const slotsLivres = 8 - prev.length;
      if (slotsLivres <= 0) return prev;
      const toAdd = novosArquivos
        .slice(0, slotsLivres)
        .map((f) => ({ file: f, preview: URL.createObjectURL(f) }));
      return [...prev, ...toAdd];
    });
  };

  const removerFoto = (index: number) => {
    setFotosEntries((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImagem = async (file: File, pasta: string): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("pasta", pasta);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    if (!res.ok) throw new Error("Erro no upload da imagem");
    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.slug || !form.categoria || !form.resumo || !form.conteudo || !capaFile) {
      alert("Preenche todos os campos obrigatórios e seleciona a foto capa.");
      return;
    }

    setLoading(true);
    try {
      const capaUrl = await uploadImagem(capaFile, "noticias/capas");

      const fotosUrls: string[] = [];
      for (const entry of fotosEntries) {
        fotosUrls.push(await uploadImagem(entry.file, "noticias/fotos"));
      }

      await fetch("/api/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, capa: capaUrl, fotos: fotosUrls }),
      });

      router.push("/admin/noticias");
    } catch (err) {
      alert("Erro ao salvar. Tenta novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <a href="/admin/noticias" className="text-xs text-white/60 transition-colors hover:text-white">← Voltar</a>
      </header>

      <main className="mx-auto max-w-[860px] px-8 py-12">
        <h1 className="mb-2 text-2xl font-black text-[#00497F]">Nova Notícia</h1>
        <nav className="mb-8 flex items-center gap-2 text-xs text-[#BCBABA]">
          <a href="/admin" className="hover:text-[#006EB7]">Painel</a>
          <span>/</span>
          <a href="/admin/noticias" className="hover:text-[#006EB7]">Notícias</a>
          <span>/</span>
          <span className="text-[#595959]">Nova</span>
        </nav>

        <div className="flex flex-col gap-6 rounded-[20px] bg-white p-8 shadow-sm">

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Título*</label>
            <input
              type="text"
              value={form.titulo}
              onChange={handleTitulo}
              placeholder="Ex: Fabiano Zaffalon conquista prêmio nacional"
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Slug* <span className="font-normal text-[#BCBABA]">(gerado automaticamente)</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm text-[#BCBABA] outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Categoria*</label>
            <input
              type="text"
              value={form.categoria}
              onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
              placeholder="Ex: Conquistas, Institucional, Parcerias"
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Resumo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Resumo* <span className="font-normal text-[#BCBABA]">(aparece nos cards)</span>
            </label>
            <textarea
              value={form.resumo}
              onChange={(e) => setForm((p) => ({ ...p, resumo: e.target.value }))}
              rows={2}
              placeholder="Breve descrição da notícia..."
              className="resize-none rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Conteúdo* <span className="font-normal text-[#BCBABA]">(separe parágrafos com linha em branco)</span>
            </label>
            <textarea
              value={form.conteudo}
              onChange={(e) => setForm((p) => ({ ...p, conteudo: e.target.value }))}
              rows={10}
              placeholder={"Texto completo da notícia...\n\nNovo parágrafo aqui..."}
              className="resize-y rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Foto capa */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Foto capa* <span className="font-normal text-[#BCBABA]">(PNG ou JPG)</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
                Selecionar foto
                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleCapa} className="hidden" />
              </label>
              {capaPreview && (
                <div className="relative h-20 w-36 overflow-hidden rounded-[8px]">
                  <img src={capaPreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            {capaFile && <p className="text-xs text-[#006EB7]">{capaFile.name}</p>}
          </div>

          {/* Fotos extras */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Fotos extras{" "}
              <span className="font-normal text-[#BCBABA]">
                (opcional — {fotosEntries.length}/8 selecionadas)
              </span>
            </label>

            {fotosEntries.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {fotosEntries.map((entry, i) => (
                  <div key={i} className="relative h-20 w-32 overflow-hidden rounded-[8px]">
                    <img
                      src={entry.preview}
                      alt={`Foto ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removerFoto(i)}
                      title="Remover foto"
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {fotosEntries.length < 8 && (
              <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
                {fotosEntries.length === 0 ? "Selecionar fotos" : "Adicionar mais fotos"}
                <input
                  ref={fotosInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  multiple
                  onChange={handleFotos}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Ordem + Data de publicação */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#595959]">Ordem de exibição</label>
              <input
                type="number"
                value={form.ordem}
                onChange={(e) => setForm((p) => ({ ...p, ordem: Number(e.target.value) }))}
                className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#595959]">Data de publicação</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm((p) => ({ ...p, publishedAt: e.target.value }))}
                className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[#595959]">Publicar imediatamente</label>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, publicada: !p.publicada }))}
              className={
                "relative h-6 w-11 rounded-full transition-colors " +
                (form.publicada ? "bg-[#006EB7]" : "bg-gray-300")
              }
            >
              <span className={
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " +
                (form.publicada ? "left-5" : "left-0.5")
              } />
            </button>
            <span className="text-xs text-[#BCBABA]">
              {form.publicada ? "Será publicada" : "Salvar como rascunho"}
            </span>
          </div>

          {/* Botão */}
          <div className="flex justify-end border-t border-[#F6F6F6] pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-[8px] bg-[#006EB7] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar notícia"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
