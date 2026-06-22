"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const UNIDADES = [
  {
    id: "pelotas",
    label: "Pelotas",
    endereco: "R. Santa Clara, nº 02 – Três Vendas – RS, Brasil",
    telefone: "(53) 3273 4110",
    whatsapp: "(53) 98103 0116",
    email: "contatopel@fzltda.com.br",
    whatsappHref: "https://wa.me/5553981030116",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d-52.3441931567227!3d-31.72557873927473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5364df1a70b%3A0x9c9c1dc6e84fcff1!2sFabiano%20Zaffalon%20%26%20Cia%20Ltda!5e0!3m2!1spt-BR!2sbr!4v1780699770282!5m2!1spt-BR!2sbr",
  },
  {
    id: "rio-pardo",
    label: "Rio Pardo",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/5551983431014",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d-52.36828410640743!3d-29.99246068124005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d5110ae4b03%3A0x79aa6f3f8939c3f1!2sBR-471%2C%20900%20-%20Jardim%20Boa%20Vista%2C%20Rio%20Pardo%20-%20RS%2C%2096640-000!5e0!3m2!1spt-BR!2sbr!4v1780700027097!5m2!1spt-BR!2sbr",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    endereco: "Av. Perimetral, 2854 – Jardim Boa Vista – Rio Pardo, RS",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/5551983431014",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1033.7426768929695!2d-52.3678330891196!3d-29.992139473485718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d9864ddbed9%3A0x8926895859d25f7f!2sNestl%C3%A9%20Rio%20Pardo!5e0!3m2!1spt-BR!2sbr!4v1780699898789!5m2!1spt-BR!2sbr",
  },
];

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
  const [unidade, setUnidade] = useState("pelotas");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const atual = UNIDADES.find((u) => u.id === unidade)!;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Contato:", form, unidade);
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
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] sm:w-auto sm:self-end"
            >
              Enviar mensagem
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
            </button>
          </form>
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
  const [agreed, setAgreed] = useState(false);
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
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Candidatura:", { ...form, fileName, agreed });
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
              Declaro que as informações fornecidas são verdadeiras e autorizo o
              tratamento dos meus dados para fins de recrutamento e seleção.
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00497F] border-2 border-transparent"
            >
              Enviar candidatura
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
            </button>
          </div>
        </form>
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

        {/* Valores com ícones do projeto */}
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
              href="mailto:rh@fzltda.com.br"
              className="flex items-center gap-2 hover:text-[#006EB7] transition-colors"
            >
              <Icon name="icon-email" /> rh@fzltda.com.br
            </a>
            <a
              href="tel:55533273410"
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
        {/* Tabs */}
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
