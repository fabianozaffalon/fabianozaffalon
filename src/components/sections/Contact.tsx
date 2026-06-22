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
    <Image src={`/images/icons/${name}.svg`} alt="" aria-hidden="true"
      width={20} height={20} className="h-5 w-5 shrink-0" />
  );
}

const inputClass =
  "w-full rounded-[8px] border border-[#D1D1D1] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none focus:border-[#006EB7] transition-colors";

export function Contact() {
  const [unidade, setUnidade] = useState<"pelotas" | "rio-pardo" | "broker">("pelotas");
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const atual = UNIDADES.find((u) => u.id === unidade)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Formulário enviado:", form);
  }

  return (
    <section id="contato" className="bg-[#E2E2E2] pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <h2 className="mb-1 font-bold text-[#595959]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Contato
        </h2>
        <p className="mb-8 text-sm font-medium text-[#595959]">Deixe a sua mensagem</p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required className={inputClass} />
                <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required className={inputClass} />
              </div>
              <input type="text" name="assunto" placeholder="Assunto" value={form.assunto} onChange={handleChange} required className={inputClass} />
              <textarea name="mensagem" placeholder="Mensagem" rows={5} value={form.mensagem} onChange={handleChange} required className={`${inputClass} resize-none`} />
              <button type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] border-2 border-transparent hover:border-[#006EB7] sm:w-auto sm:self-start">
                Enviar a mensagem
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>

          <div className="w-full lg:w-[360px] lg:shrink-0">
            <p className="mb-3 text-sm font-medium text-[#595959]">Selecione a unidade:</p>
            <div className="mb-6 flex w-full overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
              {UNIDADES.map((u) => (
                <button key={u.id} onClick={() => setUnidade(u.id as typeof unidade)}
                  className={"flex-1 py-3 text-sm font-medium transition-colors " +
                    (unidade === u.id ? "bg-[#006EB7] text-white" : "text-[#595959] hover:bg-[#F5F5F5]")}>
                  {u.label}
                </button>
              ))}
            </div>
            <div className="rounded-[12px] bg-white p-5 shadow-sm lg:bg-transparent lg:p-0 lg:shadow-none">
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3"><Icon name="icon-pin" /><span className="text-sm text-[#595959] leading-snug">{atual.endereco}</span></li>
                <li className="flex items-center gap-3"><Icon name="icon-phone" /><a href={`tel:${atual.telefone.replace(/\D/g, "")}`} className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors">{atual.telefone}</a></li>
                <li className="flex items-center gap-3"><Icon name="icon-whatsapp" /><a href={atual.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors">{atual.whatsapp}</a></li>
                <li className="flex items-center gap-3"><Icon name="icon-email" /><a href={`mailto:${atual.email}`} className="text-sm text-[#595959] hover:text-[#006EB7] transition-colors">{atual.email}</a></li>
              </ul>
              <div className="mt-5 flex gap-3 lg:hidden">
                <a href={atual.whatsappHref} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] py-3 text-sm font-medium text-white">WhatsApp</a>
                <a href={`tel:${atual.telefone.replace(/\D/g, "")}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border-2 border-[#006EB7] py-3 text-sm font-medium text-[#006EB7] hover:bg-[#006EB7] hover:text-white transition-colors">Ligar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
