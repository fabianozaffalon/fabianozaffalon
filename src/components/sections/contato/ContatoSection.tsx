"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Dados das unidades ────────────────────────────────────────────────────────
const UNIDADES = [
  {
    id: "pelotas",
    label: "Pelotas",
    endereco: "R. Santa Clara, nº 02 – Três Vendas – RS, Brasil",
    telefone: "(53) 3273 4110",
    whatsapp: "(53) 98103 0116",
    whatsappHref: "https://wa.me/5553981030116",
    email: "contatopel@fzltda.com.br",
    horario: "Seg. a Sex. 8h às 18h",
    pedidoHref: "#contato",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d-52.3441931567227!3d-31.72557873927473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5364df1a70b%3A0x9c9c1dc6e84fcff1!2sFabiano%20Zaffalon%20%26%20Cia%20Ltda!5e0!3m2!1spt-BR!2sbr!4v1780699770282!5m2!1spt-BR!2sbr",
  },
  {
    id: "rio-pardo",
    label: "Rio Pardo",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    whatsappHref: "https://wa.me/5551983431014",
    email: "contatorp@fzltda.com.br",
    horario: "Seg. a Sex. 8h às 18h",
    pedidoHref: "#contato",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d-52.36828410640743!3d-29.99246068124005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d5110ae4b03%3A0x79aa6f3f8939c3f1!2sBR-471%2C%20900%20-%20Jardim%20Boa%20Vista%2C%20Rio%20Pardo%20-%20RS%2C%2096640-000!5e0!3m2!1spt-BR!2sbr!4v1780700027097!5m2!1spt-BR!2sbr",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    endereco: "Av. Perimetral, 2854 – Jardim Boa Vista – Rio Pardo, RS",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    whatsappHref: "https://wa.me/5551983431014",
    email: "contatorp@fzltda.com.br",
    horario: "Seg. a Sex. 8h às 18h",
    pedidoHref: "#contato",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1033.7426768929695!2d-52.3678330891196!3d-29.992139473485718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d9864ddbed9%3A0x8926895859d25f7f!2sNestl%C3%A9%20Rio%20Pardo!5e0!3m2!1spt-BR!2sbr!4v1780699898789!5m2!1spt-BR!2sbr",
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
  "w-full rounded-[8px] border border-[#D1D1D1] bg-white px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none focus:border-[#006EB7] transition-colors";

// ── Card Fale Conosco ─────────────────────────────────────────────────────────
function CardFaleConosco({
  unidade,
  setUnidade,
}: {
  unidade: string;
  setUnidade: (id: string) => void;
}) {
  const atual = UNIDADES.find((u) => u.id === unidade)!;

  return (
    <div className="flex h-full flex-col gap-6 rounded-[20px] bg-[#F6F6F6] p-8">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-[#00497F]">Fale com a gente</h2>
        <div
          className="mt-3  bg-[#0084E5]"
          style={{ width: "77px", height: "6px" }}
        />
      </div>

      <p className="text-lg font-medium leading-relaxed text-[#00497F]">
        Nossa equipe esta pronta
        <br />
        para te ajudar.
      </p>

      {/* Toggle unidades */}
      <div>
        <p className="mb-3 text-base font-medium text-[#595959]">
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

      {/* Dados da unidade */}
      <ul className="flex flex-col gap-4">
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
            className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]"
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
            className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]"
          >
            {atual.whatsapp}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="icon-email" />
          <a
            href={`mailto:${atual.email}`}
            className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]"
          >
            {atual.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="icon-clock-azul" />
          <span className="text-sm text-[#595959]">{atual.horario}</span>
        </li>
      </ul>

      {/* Botões — base do card */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <a
          href={atual.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-[8px] border border-[#D1D1D1] bg-white px-2 py-3 text-xs font-medium text-[#595959] transition-colors hover:border-[#00497F] hover:text-[#00497F]"
        >
          <Icon name="icon-whatsapp" /> Whatsapp
        </a>
        <a
          href={`tel:${atual.telefone.replace(/\D/g, "")}`}
          className="flex items-center justify-center gap-1.5 rounded-[8px] border border-[#D1D1D1] bg-white px-2 py-3 text-xs font-medium text-[#595959] transition-colors hover:border-[#00497F] hover:text-[#00497F]"
        >
          <Icon name="icon-phone" /> Telefone
        </a>
        <a
          href={atual.pedidoHref}
          className="flex items-center justify-center gap-1.5 rounded-[8px] border border-[#D1D1D1] bg-white px-2 py-3 text-xs font-medium text-[#595959] transition-colors hover:border-[#00497F] hover:text-[#00497F]"
        >
          <Icon name="icon-fazer-pedido" /> Fazer pedido
        </a>
      </div>
    </div>
  );
}

// ── Card Trabalhe Conosco ─────────────────────────────────────────────────────
function CardTrabalheConosco() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    cargo: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trabalhe Conosco:", { ...form, fileName, agreed });
  };

  return (
    <div className="flex h-full flex-col gap-4 rounded-[20px] bg-[#F6F6F6] p-7">
      <div>
        <p className="text-xl font-bold tracking-wider text-[#006EB7]">
          Trabalhe conosco
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
          className="mt-2  bg-[#0084E5]"
          style={{ width: "77px", height: "6px" }}
        />
      </div>

      <p className="text-sm leading-relaxed text-[#595959]">
        Fazer parte da equipe Fabiano Zaffalon é integrar uma empresa com quase
        30 anos de história, construída com base em compromisso, confiança e
        desenvolvimento contínuo. Valorizamos pessoas que buscam aprender,
        evoluir e contribuir para resultados coletivos, oferecendo um ambiente
        estruturado, oportunidades de crescimento e a possibilidade de construir
        uma carreira sólida. Se você acredita no poder do trabalho, gosta de
        desafios e deseja fazer parte de uma equipe que cresce junto, envie seu
        currículo e venha construir o próximo capítulo dessa história conosco.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Linha 1 */}
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
        {/* Linha 2 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone/Whatsapp"
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
        {/* Mensagem */}
        <textarea
          name="mensagem"
          placeholder="Mensagem (opcional)"
          rows={2}
          value={form.mensagem}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />

        {/* Anexar currículo + Checkbox */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Upload */}
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
              Arquivo PDF, DOC ou DOCX
            </p>
            {fileName && (
              <p className="mt-0.5 pl-7 text-xs text-[#006EB7] font-medium">
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

          {/* Checkbox LGPD */}
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

        {/* Botão */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] border-2 border-transparent hover:border-[#006EB7]"
          >
            Enviar a mensagem
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
  );
}

// ── Mapa Google ───────────────────────────────────────────────────────────────
function MapaGoogle({ mapSrc }: { mapSrc: string }) {
  return (
    <div className="w-full overflow-hidden" style={{ height: "420px" }}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de localização Fabiano Zaffalon"
      />
    </div>
  );
}

// ── Seção principal ───────────────────────────────────────────────────────────
export function ContatoSection() {
  const [unidade, setUnidade] = useState("pelotas");
  const atual = UNIDADES.find((u) => u.id === unidade)!;

  return (
    <>
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:items-stretch">
            <CardFaleConosco unidade={unidade} setUnidade={setUnidade} />
            <CardTrabalheConosco />
          </div>
        </div>
      </section>

      {/* Mapa — muda conforme unidade selecionada */}
      <MapaGoogle mapSrc={atual.mapSrc} />
    </>
  );
}
