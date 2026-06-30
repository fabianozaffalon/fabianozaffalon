"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { upload } from "@vercel/blob/client";

const UNIDADES = [
  { id: "sul",     label: "Região Sul"     },
  { id: "central", label: "Região Central" },
  { id: "broker",  label: "Broker Nestlé"  },
];

export default function EditarMarcaPage() {
  const router = useRouter();
  const { id } = useParams();
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState({
    name: "",
    unidades: [] as string[],
    ordem: 0,
    ativo: true,
    logo: "",
    catalogoPdf: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  useEffect(() => {
    fetch(`/api/marcas/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name:        data.name,
          unidades:    data.unidades,
          ordem:       data.ordem,
          ativo:       data.ativo,
          logo:        data.logo,
          catalogoPdf: data.catalogoPdf ?? "",
        });
        setLogoPreview(data.logo);
      });
  }, [id]);

  const handleUnidade = (uid: string) => {
    setForm((prev) => ({
      ...prev,
      unidades: prev.unidades.includes(uid)
        ? prev.unidades.filter((u) => u !== uid)
        : [...prev.unidades, uid],
    }));
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  const handleSubmit = async () => {
    setSalvando(true);
    try {
      let logoUrl = form.logo;
      let pdfUrl = form.catalogoPdf;

      if (logoFile) {
        const logoData = new FormData();
        logoData.append("file", logoFile);
        logoData.append("pasta", "catalogo/logos");
        const res = await fetch("/api/upload", { method: "POST", body: logoData });
        const { url } = await res.json();
        logoUrl = url;
      }

      // Novo PDF — Vercel Blob, direto do client (não passa pela function)
      if (pdfFile) {
        try {
          const blob = await upload(pdfFile.name, pdfFile, {
            access: "public",
            handleUploadUrl: "/api/upload-pdf",
          });
          pdfUrl = blob.url;
        } catch (err: any) {
          alert(err?.message ?? "Erro ao enviar o PDF.");
          setSalvando(false);
          return;
        }
      }

      await fetch(`/api/marcas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        form.name,
          logo:        logoUrl,
          catalogoPdf: pdfUrl || null,
          unidades:    form.unidades,
          ordem:       form.ordem,
          ativo:       form.ativo,
        }),
      });

      router.push("/admin/catalogo");
    } catch (err) {
      alert("Erro ao salvar.");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza? Esta ação é permanente e não pode ser desfeita.")) return;
    await fetch(`/api/marcas/${id}`, { method: "DELETE" });
    router.push("/admin/catalogo");
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <header className="flex items-center justify-between bg-[#00497F] px-8 py-4">
        <div className="flex items-center gap-4">
          <img src="/images/logo-white.svg" alt="Fabiano Zaffalon" className="w-36" />
          <span className="text-sm text-white/60">| Painel Admin</span>
        </div>
        <a href="/admin/catalogo" className="text-xs text-white/60 transition-colors hover:text-white">
          ← Voltar
        </a>
      </header>

      <main className="mx-auto max-w-[720px] px-8 py-12">
        <h1 className="mb-8 text-2xl font-black text-[#00497F]">Editar Marca</h1>

        <div className="flex flex-col gap-6 rounded-[20px] bg-white p-8 shadow-sm">

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Nome da marca*</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Unidades */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Unidades*</label>
            <div className="flex gap-3">
              {UNIDADES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleUnidade(u.id)}
                  className={
                    "rounded-[8px] border-2 px-4 py-2 text-sm font-medium transition-colors " +
                    (form.unidades.includes(u.id)
                      ? "border-[#006EB7] bg-[#006EB7] text-white"
                      : "border-[#D1D1D1] text-[#595959] hover:border-[#006EB7]")
                  }
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Logo <span className="font-normal text-[#BCBABA]">(PNG ou JPG)</span></label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="flex h-16 w-32 items-center justify-center rounded-[8px] bg-[#1A4FA0]">
                  <img src={logoPreview} alt="Logo atual" className="h-10 w-auto object-contain" />
                </div>
              )}
              <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
                Trocar logo
                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleLogo} className="hidden" />
              </label>
            </div>
            {logoFile && <p className="text-xs text-[#006EB7]">{logoFile.name}</p>}
          </div>

          {/* PDF */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">
              PDF do Catálogo <span className="font-normal text-[#BCBABA]">(opcional)</span>
            </label>
            {form.catalogoPdf && (
              <a href={form.catalogoPdf} target="_blank" rel="noopener noreferrer"
                className="w-fit text-xs text-[#006EB7] underline underline-offset-2">
                Ver PDF atual
              </a>
            )}
            <label className="w-fit cursor-pointer rounded-[8px] border-2 border-dashed border-[#D1D1D1] px-6 py-3 text-sm text-[#595959] transition-colors hover:border-[#006EB7] hover:text-[#006EB7]">
              {form.catalogoPdf ? "Trocar PDF" : "Adicionar PDF"}
              <input type="file" accept=".pdf" onChange={handlePdf} className="hidden" />
            </label>
            {pdfFile && (
              <p className="text-xs text-[#006EB7]">
                {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(1)}MB)
              </p>
            )}
            <p className="text-xs text-[#BCBABA]">Tamanho máximo: 50MB</p>
          </div>

          {/* Ordem */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#595959]">Ordem de exibição</label>
            <input
              type="number"
              value={form.ordem}
              onChange={(e) => setForm((p) => ({ ...p, ordem: Number(e.target.value) }))}
              className="w-24 rounded-[8px] border border-[#D1D1D1] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#006EB7]"
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-[#595959]">Ativo</label>
            <button
              onClick={() => setForm((p) => ({ ...p, ativo: !p.ativo }))}
              className={
                "relative h-6 w-11 rounded-full transition-colors " +
                (form.ativo ? "bg-[#006EB7]" : "bg-gray-300")
              }
            >
              <span className={
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " +
                (form.ativo ? "left-5" : "left-0.5")
              } />
            </button>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between border-t border-[#F6F6F6] pt-6">
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-700"
            >
              Excluir marca permanentemente
            </button>
            <button
              onClick={handleSubmit}
              disabled={salvando}
              className="rounded-[8px] bg-[#006EB7] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-50"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
