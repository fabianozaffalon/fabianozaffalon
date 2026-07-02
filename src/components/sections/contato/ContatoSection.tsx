"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { UNIDADES, type UnidadeId } from "@/lib/unidades";

const VALORES = [
  {
    icon: "icon-valores.svg",
    titulo: "Comprometimento",
    texto:
      "Valorizamos pessoas que se dedicam e entregam resultados consistentes.",
  },
  {
    icon: "icon-visao.svg",
    titulo: "Crescimento",
    texto:
      "Investimos no desenvolvimento de cada colaborador ao longo da jornada.",
  },
  {
    icon: "icon-missao.svg",
    titulo: "Foco em resultados",
    texto:
      "Trabalhamos com metas claras e celebramos cada conquista em equipe.",
  },
];

function Icon({ name }: { name: string }) {
  return (
    <Image
      src={`/images/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className="h-5 w-5 shrink-0"
    />
  );
}

const inputClass =
  "w-full rounded-[8px] border border-[#D1D1D1] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none focus:border-[#006EB7] transition-colors";

// ── Fale com a gente ──────────────────────────────────────────────────────────

function FaleComAGente() {
  const [unidade, setUnidade] = useState<UnidadeId>("pelotas");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [erro, setErro] = useState("");

  const atual = UNIDADES.find((u) => u.id === unidade)!;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErro("");

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, unidade }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao enviar.");
      }

      setStatus("success");
      setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    } catch (err: any) {
      setErro(err.message);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_360px] md:items-start md:gap-12">
        {/* Formulário */}
        <div className="flex flex-col gap-6 rounded-[20px] bg-[#F6F6F6] p-8">
          <div>
            <h2 className="text-2xl font-bold text-[#00497F]">
              Envie sua mensagem
            </h2>
            <div
              className="mt-3 bg-[#0084E5]"
              style={{ width: "77px", height: "6px" }}
            />
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 rounded-[12px] bg-green-50 border border-green-200 px-6 py-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-base font-bold text-green-700">
                Mensagem enviada com sucesso!
              </p>
              <p className="text-sm text-green-600">
                Em breve nossa equipe de <strong>{atual.label}</strong> entrará
                em contato.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs text-[#006EB7] underline underline-offset-2"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo*"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                name="assunto"
                placeholder="Assunto*"
                value={form.assunto}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <textarea
                name="mensagem"
                placeholder="Mensagem*"
                rows={5}
                value={form.mensagem}
                onChange={handleChange}
                required
                className={`${inputClass} resize-none`}
              />

              {/* Marcador de destino */}
              <div className="flex items-center gap-2 rounded-[8px] bg-[#EBF4FF] px-4 py-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0 text-[#006EB7]"
                >
                  <path
                    fillRule="evenodd"
                    d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs text-[#595959]">
                  Enviando para:{" "}
                  <strong className="text-[#00497F]">{atual.label}</strong>
                </span>
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">{erro}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-60 sm:w-auto sm:self-end"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensagem"}
                {status !== "loading" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Dados da unidade */}
        <div className="flex flex-col gap-5 rounded-[20px] bg-[#F6F6F6] p-8">
          <div>
            <h3 className="text-lg font-bold text-[#00497F]">
              Fale com a gente
            </h3>
            <p className="mt-1 text-sm text-[#595959]">
              Nossa equipe está pronta para te ajudar.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-[#595959]">
              Selecione a unidade:
            </p>
            <div className="flex overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
              {UNIDADES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUnidade(u.id)}
                  className={
                    "flex-1 py-3 text-xs font-medium transition-colors " +
                    (unidade === u.id
                      ? "bg-[#006EB7] text-white"
                      : "text-[#595959] hover:bg-gray-50")
                  }
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3">
              <Icon name="icon-pin" />
              <span className="text-sm leading-snug text-[#595959]">
                {atual.endereco}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="icon-phone" />
              <a
                href={`tel:${atual.telefone.replace(/\D/g, "")}`}
                className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors"
              >
                {atual.telefone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="icon-whatsapp" />
              <a
                href={atual.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors"
              >
                {atual.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="icon-email" />
              <a
                href={`mailto:${atual.email}`}
                className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors"
              >
                {atual.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="icon-clock-azul" />
              <span className="text-sm text-[#595959]">{atual.horario}</span>
            </li>
          </ul>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={atual.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-[8px] border-2 border-[#006EB7] py-3 text-xs font-semibold text-[#006EB7] hover:bg-[#006EB7] hover:text-white transition-colors"
            >
              <Icon name="icon-whatsapp" /> WhatsApp
            </a>
            <a
              href={`tel:${atual.telefone.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-1.5 rounded-[8px] border-2 border-[#006EB7] py-3 text-xs font-semibold text-[#006EB7] hover:bg-[#006EB7] hover:text-white transition-colors"
            >
              <Icon name="icon-phone" /> Ligar
            </a>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div
        className="mt-8 w-full overflow-hidden rounded-[16px]"
        style={{ height: "380px" }}
      >
        <iframe
          src={atual.mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de localização Fabiano Zaffalon"
        />
      </div>
    </>
  );
}

// ── Trabalhe Conosco ──────────────────────────────────────────────────────────

function TrabalheConosco() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    cargo: "",
    mensagem: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileObj(file);
      setFileName(file.name);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!agreed) {
      setErro("Você precisa aceitar os termos para enviar a candidatura.");
      return;
    }

    setStatus("loading");
    setErro("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (fileObj) data.append("arquivo", fileObj);

      const res = await fetch("/api/curriculo", { method: "POST", body: data });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Erro ao enviar.");
      }

      setStatus("success");
      setForm({
        nome: "",
        email: "",
        telefone: "",
        cidade: "",
        cargo: "",
        mensagem: "",
      });
      setFileName("");
      setFileObj(null);
      setAgreed(false);
    } catch (err: any) {
      setErro(err.message);
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_360px] md:items-start md:gap-12">
      {/* Formulário */}
      <div className="flex flex-col gap-6 rounded-[20px] bg-[#F6F6F6] p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[#006EB7]">
            Trabalhe Conosco
          </p>
          <h2
            className="mt-1 font-bold leading-tight text-[#00497F]"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          >
            Venha vencer desafios
            <br />
            com a gente
          </h2>
          <div
            className="mt-2 bg-[#0084E5]"
            style={{ width: "77px", height: "6px" }}
          />
        </div>
        <p className="text-sm leading-relaxed text-[#595959]">
          Fazer parte da equipe Fabiano Zaffalon é integrar uma empresa com
          quase 30 anos de história, construída com base em compromisso,
          confiança e desenvolvimento contínuo. Valorizamos pessoas que buscam
          aprender, evoluir e contribuir para resultados coletivos.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 rounded-[12px] bg-green-50 border border-green-200 px-6 py-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-base font-bold text-green-700">
              Candidatura enviada com sucesso!
            </p>
            <p className="text-sm text-green-600">
              Analisaremos seu currículo e entraremos em contato em breve.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-[#006EB7] underline underline-offset-2"
            >
              Enviar outra candidatura
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="nome"
                placeholder="Nome completo*"
                value={form.nome}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail*"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone/WhatsApp"
                value={form.telefone}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade*"
                value={form.cidade}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo pretendido"
                value={form.cargo}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <textarea
              name="mensagem"
              placeholder="Mensagem (opcional)"
              rows={3}
              value={form.mensagem}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-[#595959] hover:text-[#006EB7] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    />
                  </svg>
                  <span className="font-medium">Anexar currículo*</span>
                </button>
                <p className="mt-0.5 pl-7 text-xs text-[#ABABAB]">
                  PDF, DOC ou DOCX
                </p>
                {fileName && (
                  <p className="mt-0.5 pl-7 text-xs font-medium text-[#006EB7]">
                    {fileName}
                  </p>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>
              <label className="flex max-w-[320px] cursor-pointer items-start gap-2 text-xs text-[#595959]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#006EB7]"
                />
                Declaro que as informações fornecidas são verdadeiras e autorizo
                o tratamento dos meus dados para fins de recrutamento e seleção.
              </label>
            </div>

            {status === "error" && (
              <p className="text-xs text-red-500">{erro}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] disabled:opacity-60 border-2 border-transparent"
              >
                {status === "loading" ? "Enviando..." : "Enviar candidatura"}
                {status !== "loading" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Lateral */}
      <div className="flex flex-col gap-5">
        <div className="rounded-[16px] bg-[#00497F] p-6 text-white">
          <h3 className="mb-2 text-lg font-black">Faça parte do nosso time</h3>
          <p className="text-sm leading-relaxed text-white/80">
            Se você quer fazer parte de uma empresa sólida, com quase 30 anos de
            história no mercado, essa é a sua oportunidade.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {VALORES.map((v) => (
            <div
              key={v.titulo}
              className="flex items-start gap-3 rounded-[12px] bg-white p-4 shadow-sm"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#006EB7]/10">
                <Image
                  src={`/images/icons/${v.icon}`}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-11 w-11"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-[#00497F]">{v.titulo}</p>
                <p className="text-xs leading-relaxed text-[#595959]">
                  {v.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[12px] border border-[#D1D1D1] bg-white p-5">
          <p className="mb-3 text-sm font-semibold text-[#595959]">
            Dúvidas? Fale com o RH:
          </p>
          <div className="flex flex-col gap-2 text-sm text-[#595959]">
            <a
              href="mailto:contatopel@fzltda.com.br"
              className="flex items-center gap-2 hover:text-[#006EB7] transition-colors"
            >
              <Icon name="icon-email" /> contatopel@fzltda.com.br
            </a>
            <a
              href="https://wa.me/555332734110"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#006EB7] transition-colors"
            >
              <Icon name="icon-phone" /> (53) 3273 4110
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export function ContatoSection() {
  const searchParams = useSearchParams();
  const [aba, setAba] = useState<"fale" | "trabalhe">("fale");

  useEffect(() => {
    if (searchParams.get("aba") === "trabalhe-conosco") setAba("trabalhe");
  }, [searchParams]);

  return (
    <section className="bg-[#EFEFEF] pt-10 pb-14 md:pt-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="mb-10 flex w-fit gap-1 rounded-[10px] bg-white p-1 shadow-sm">
          <button
            onClick={() => setAba("fale")}
            className={
              "rounded-[8px] px-5 py-2.5 text-sm font-semibold transition-colors " +
              (aba === "fale"
                ? "bg-[#006EB7] text-white"
                : "text-[#595959] hover:text-[#006EB7]")
            }
          >
            Fale com a gente
          </button>
          <button
            onClick={() => setAba("trabalhe")}
            className={
              "rounded-[8px] px-5 py-2.5 text-sm font-semibold transition-colors " +
              (aba === "trabalhe"
                ? "bg-[#006EB7] text-white"
                : "text-[#595959] hover:text-[#006EB7]")
            }
          >
            Trabalhe Conosco
          </button>
        </div>

        {aba === "fale" ? <FaleComAGente /> : <TrabalheConosco />}
      </div>
    </section>
  );
}
