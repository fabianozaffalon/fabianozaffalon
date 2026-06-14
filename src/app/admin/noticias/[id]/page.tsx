"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarNoticiaPage() {
  const router = useRouter();
  const { id } = useParams();
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    categoria: "",
    resumo: "",
    conteudo: "",
    publicada: true,
    capa: "",
    fotos: [] as string[],
  });
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState("");
  const [fotosFiles, setFotosFiles] = useState<File[]>([]);
  const [fotosPreviews, setFotosPreviews] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/noticias/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          titulo:    data.titulo,
          slug:      data.slug,
          categoria: data.categoria,
          resumo:    data.resumo,
          conteudo:  data.conteudo,
          publicada: data.publicada,
          capa:      data.capa,
          fotos:     data.fotos ?? [],
        });
        setCapaPreview(data.capa);
        setFotosPreviews(data.fotos ?? []);
      });
  }, [id]);

  const handleCapa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapaFile(file);
      setCapaPreview(URL.createObjectURL(file));
    }
  };

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 8);
    setFotosFiles(files);
    setFotosPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const uploadImagem = async (file: File, pasta: string): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("pasta", pasta);
    const res = await fetch("/api/upload", { method: "POST", body: data });
    if (!res.ok) throw new Error("Erro no upload");
    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async () => {
    setSalvando(true);
    try {
      let capaUrl = form.capa;
      let fotosUrls = form.fotos;

      if (capaFile) capaUrl = await uploadImagem(capaFile, "noticias/capas");

      if (fotosFiles.length > 0) {
        fotosUrls = [];
        for (const foto of fotosFiles) {
          fotosUrls.push(await uploadImagem(foto, "noticias/fotos"));
        }
      }

      await fetch(`/api/noticias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, capa: capaUrl, fotos: fotosUrls }),
      });

      router.push("/admin/noticias");
    } catch (err) {
      alert("Erro ao salvar.");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza? Esta ação é permanente e não pode ser desfeita.")) return;
    await fetch(`/api/noticias/${id}`, { method: "DELETE" });
    router.push("/admin/noticias");
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
        <h1 className="mb-2 text-2xl font-black text-[#00497F]">Editar Notícia</h1>
        <nav className="mb-8 flex items-center gap-2 text-xs text-[#BCBABA]">
          <a href="/admin" className="hover:text-[#006EB7]">Painel</a>
          <span>/</span>
          <a href="/admin/noticias" className="hover:text-[#006EB7]">Notícias</a>
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
            <label className="text-sm font-semibold text-[#595959]">Slug*</label>
            <input type="text" value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm text-[#BCBABA] outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Categoria*</label>
            <input type="text" value={form.categoria}
              onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Resumo*</label>
            <textarea value={form.resumo} rows={2}
              onChange={(e) => setForm((p) => ({ ...p, resumo: e.target.value }))}
              className="resize-none rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Conteúdo* <span className="font-normal text-[#BCBABA]">(separe parágrafos com linha em branco)</span>
            </label>
            <textarea value={form.conteudo} rows={10}
              onChange={(e) => setForm((p) => ({ ...p, conteudo: e.target.value }))}
              className="resize-y rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]" />
          </div>

          {/* Capa */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Foto capa</label>
            <div className="flex items-center gap-4">
              {capaPreview && (
                <div className="relative h-20 w-36 overflow-hidden rounded-[8px]">
                  <img src={capaPreview} alt="Capa" className="h-full w-full object-cover" />
                </div>
              )}
              <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
                Trocar capa
                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleCapa} className="hidden" />
              </label>
            </div>
            {capaFile && <p className="text-xs text-[#006EB7]">{capaFile.name}</p>}
          </div>

          {/* Fotos extras */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              Fotos extras <span className="font-normal text-[#BCBABA]">(até 8 — substituirá as atuais)</span>
            </label>
            {fotosPreviews.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {fotosPreviews.map((src, i) => (
                  <div key={i} className="relative h-20 w-32 overflow-hidden rounded-[8px]">
                    <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
              {fotosPreviews.length > 0 ? "Substituir fotos" : "Adicionar fotos"}
              <input type="file" accept=".png,.jpg,.jpeg" multiple onChange={handleFotos} className="hidden" />
            </label>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[#595959]">Publicada</label>
            <button
              onClick={() => setForm((p) => ({ ...p, publicada: !p.publicada }))}
              className={"relative h-6 w-11 rounded-full transition-colors " + (form.publicada ? "bg-[#006EB7]" : "bg-gray-300")}
            >
              <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (form.publicada ? "left-5" : "left-0.5")} />
            </button>
            <span className="text-xs text-[#BCBABA]">{form.publicada ? "Visível no site" : "Rascunho"}</span>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between border-t border-[#F6F6F6] pt-6">
            <button onClick={handleDelete}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-700">
              Excluir notícia permanentemente
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
