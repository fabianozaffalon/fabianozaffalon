"use client";

import { useState } from "react";
import Image from "next/image";

const UNIDADES = [
  {
    id: "pelotas",
    label: "Pelotas",
    endereco: "R. Santa Clara, nº 02 – Três Vendas – RS, Brasil",
    telefone: "(53) 32734110",
    whatsapp: "(53) 981030116",
    email: "contatopel@fzltda.com.br",
    whatsappHref: "https://wa.me/5553981030116",
  },
  {
    id: "rio-pardo",
    label: "Rio Pardo",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/5551983431014",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731 3426",
    whatsapp: "(51) 98343 1014",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/5551983431014",
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
  "w-full rounded-[8px] border border-[#D1D1D1] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none focus:border-[#006EB7] transition-colors";

export function Contact() {
  const [unidade, setUnidade] = useState<"pelotas" | "rio-pardo" | "broker">("pelotas");
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Formulário enviado:", form);
  }

  return (
    <section id="contato" className="bg-[#E2E2E2] pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        {/* Título */}
        <h2
          className="mb-1 font-bold text-[#595959]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Contato
        </h2>
        <p className="mb-8 text-sm font-medium text-[#595959]">
          Deixe a sua mensagem
        </p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          {/* ── Formulário ── */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Nome + E-mail lado a lado em sm+ */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <input
                type="text"
                name="assunto"
                placeholder="Assunto"
                value={form.assunto}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <textarea
                name="mensagem"
                placeholder="Mensagem"
                rows={5}
                value={form.mensagem}
                onChange={handleChange}
                required
                className={`${inputClass} resize-none`}
              />

              {/* Botão — full-width em mobile */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] border-2 border-transparent hover:border-[#006EB7] sm:w-auto sm:self-start"
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
            </form>
          </div>

          {/* ── Informações da unidade ── */}
          <div className="w-full lg:w-[360px] lg:shrink-0">
            {/* Toggle — full-width em mobile */}
            <p className="mb-3 text-sm font-medium text-[#595959]">
              Selecione a unidade:
            </p>
            <div className="mb-6 flex w-full overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
              {UNIDADES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUnidade(u.id as "pelotas" | "rio-pardo" | "broker")}
                  className={
                    "flex-1 py-3 text-sm font-medium transition-colors " +
                    (unidade === u.id
                      ? "bg-[#006EB7] text-white"
                      : "text-[#595959] hover:bg-[#F5F5F5]")
                  }
                >
                  {u.label}
                </button>
              ))}
            </div>

            {/* Dados — card suave em mobile */}
            <div className="rounded-[12px] bg-white p-5 shadow-sm lg:bg-transparent lg:p-0 lg:shadow-none">
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Icon name="icon-pin" />
                  <span className="text-sm text-[#595959] leading-snug">
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
              </ul>

              {/* Atalhos de contato rápido — só mobile */}
              <div className="mt-5 flex gap-3 lg:hidden">
                <a
                  href={atual.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.547a.75.75 0 00.921.921l5.694-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.497-5.2-1.367l-.374-.217-3.876 1.001 1.001-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${atual.telefone.replace(/\D/g, "")}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border-2 border-[#006EB7] py-3 text-sm font-medium text-[#006EB7] transition-colors hover:bg-[#006EB7] hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ligar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
