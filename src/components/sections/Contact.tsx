"use client";

import { useState } from "react";
import Image from "next/image";

const UNIDADES = [
  {
    id: "pelotas",
    label: "Pelotas",
    endereco: "R. Santa Clara, nº 02 – Três Vendas – RS, Brasil",
    telefone: "(53) 3273-4110",
    whatsapp: "(53) 3273-4110",
    email: "contatopel@fzltda.com.br",
    whatsappHref: "https://wa.me/555332734110",
  },
  {
    id: "rio-pardo",
    label: "Rio Pardo",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731-3426",
    whatsapp: "(51) 3731-3426",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/555137313426",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    endereco: "BR 471, km 158 – nº 900 – RS, Brasil",
    telefone: "(51) 3731-3426",
    whatsapp: "(51) 3731-3426",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/555137313426",
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [erro, setErro] = useState("");

  const atual = UNIDADES.find((u) => u.id === unidade)!;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    <section id="contato" className="bg-[#E2E2E2] pt-8 pb-10 md:pt-12 md:pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <h2 className="mb-1 font-bold text-[#595959]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Contato
        </h2>
        <p className="mb-8 text-sm font-medium text-[#595959]">Deixe a sua mensagem</p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          {/* Formulário */}
          <div className="flex-1">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 rounded-[12px] bg-green-50 border border-green-200 px-6 py-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-green-500">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <p className="text-base font-bold text-green-700">Mensagem enviada com sucesso!</p>
                <p className="text-sm text-green-600">Em breve nossa equipe de <strong>{atual.label}</strong> entrará em contato.</p>
                <button onClick={() => setStatus("idle")} className="mt-2 text-xs text-[#006EB7] underline underline-offset-2">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required className={inputClass} />
                  <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required className={inputClass} />
                </div>
                <input type="text" name="assunto" placeholder="Assunto" value={form.assunto} onChange={handleChange} required className={inputClass} />
                <textarea name="mensagem" placeholder="Mensagem" rows={5} value={form.mensagem} onChange={handleChange} required className={`${inputClass} resize-none`} />

                {/* Marcador de destino */}
                <div className="flex items-center gap-2 rounded-[8px] bg-[#EBF4FF] px-4 py-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-[#006EB7]">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-[#595959]">
                    Enviando para: <strong className="text-[#00497F]">{atual.label}</strong>
                  </span>
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-500">{erro}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] border-2 border-transparent hover:border-[#006EB7] disabled:opacity-60 sm:w-auto sm:self-start"
                >
                  {status === "loading" ? "Enviando..." : "Enviar a mensagem"}
                  {status !== "loading" && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Dados da unidade */}
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
