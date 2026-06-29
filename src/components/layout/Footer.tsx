"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EMPRESA = [
  { label: "A Empresa", href: "/empresa" },
  { label: "FAQ", href: "/faq" },
  { label: "Notícias", href: "/noticias" },
  { label: "Fale com a gente", href: "/contato" },
  { label: "Trabalhe Conosco", href: "/contato?aba=trabalhe-conosco" },
];

const SOLUCOES = [
  { label: "Varejo", href: "/varejo" },
  { label: "Food Service", href: "/foodservice" },
  { label: "Indústria", href: "/industria" },
];

const UNIDADES = [
  {
    label: "Pelotas",
  },
  {
    label: "Rio Pardo",
    descricao: "Localização estratégica para atender todo o RS",
  },
];

// ── Acordeão — só ativo em mobile ────────────────────────────────────────────
function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-none">
      {/* Header clicável — só mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left md:hidden"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={
            "h-4 w-4 text-white/50 transition-transform duration-300 " +
            (open ? "rotate-180" : "")
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Título estático — só desktop */}
      <h3 className="mb-4 hidden text-sm font-semibold text-white md:block">
        {title}
      </h3>

      {/* Conteúdo — sempre visível no desktop, colapsa no mobile */}
      <div
        className={
          "overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible md:max-h-none! " +
          (open ? "max-h-[400px] pb-4" : "max-h-0 md:max-h-none")
        }
      >
        {children}
      </div>
    </div>
  );
}

function SocialIcon({
  name,
  href,
  label,
}: {
  name: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80"
    >
      <Image
        src={`/images/icons/${name}.svg`}
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
        className="h-6 w-6"
        style={{ width: "24px", height: "24px" }}
      />
    </a>
  );
}

function ContactIcon({ name }: { name: string }) {
  return (
    <Image
      src={`/images/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className="h-5 w-5 shrink-0"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

export function Footer() {
  return (
    <footer className="bg-[#00497F] text-white">
      {/* ── Corpo principal ── */}
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-12 md:py-16">
        {/* Logo + descrição + redes — centralizado em mobile */}
        <div className="mb-8 flex flex-col items-center gap-5 text-center md:hidden">
          <Link href="/">
            <Image
              src="/images/logo-white.svg"
              alt="Fabiano Zaffalon Distribuidora"
              width={180}
              height={111}
              className="w-[180px] h-auto"
            />
          </Link>
          <p className="max-w-[280px] text-sm font-normal leading-relaxed text-white/70">
            Se interessa por distribuição, logística e mercado? Siga nossas
            redes:
          </p>
          <div className="flex items-center justify-center gap-3">
            <SocialIcon
              name="icon-linkedin"
              href="https://www.linkedin.com/company/distribuidora-fabiano-zaffalon/"
              label="LinkedIn"
            />
            <SocialIcon
              name="icon-facebook"
              href="https://www.facebook.com/fabianozaffalon.cia/"
              label="Facebook"
            />
            <SocialIcon
              name="icon-instagram"
              href="https://www.instagram.com/fabianozaffalon.cia/"
              label="Instagram"
            />
          </div>
        </div>

        {/* Divisor mobile */}
        <div className="mb-2 border-t border-white/10 md:hidden" />

        {/* ── Mobile: acordeão | Desktop: flex row com divisores ── */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-0">
          {/* Col 1 — Logo (desktop only) */}
          <div className="hidden flex-col gap-6 md:flex md:w-[220px] md:shrink-0">
            <Link href="/">
              <Image
                src="/images/logo-white.svg"
                alt="Fabiano Zaffalon Distribuidora"
                width={240}
                height={149}
                className="h-auto w-[180px] md:w-[240px]"
              />
            </Link>
            <p className="text-sm font-normal leading-relaxed text-white/75">
              Se interessa por distribuição, logística e mercado? Siga nossas
              redes:
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon
                name="icon-linkedin"
                href="https://www.linkedin.com/company/distribuidora-fabiano-zaffalon/"
                label="LinkedIn"
              />
              <SocialIcon
                name="icon-facebook"
                href="https://www.facebook.com/fabianozaffalon.cia/"
                label="Facebook"
              />
              <SocialIcon
                name="icon-instagram"
                href="https://www.instagram.com/fabianozaffalon.cia/"
                label="Instagram"
              />
            </div>
          </div>

          {/* Divisor vertical desktop */}
          <div className="hidden lg:block w-px self-stretch bg-white/20 mx-6" />

          {/* Col 2 — Empresa */}
          <div className="md:flex-1 md:px-6">
            <AccordionSection title="Empresa">
              <ul className="flex flex-col gap-3">
                {EMPRESA.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Divisor vertical desktop */}
          <div className="hidden lg:block w-px self-stretch bg-white/20 mx-6" />

          {/* Col 3 — Soluções */}
          <div className="md:flex-1 md:px-6">
            <AccordionSection title="Atuação">
              <ul className="flex flex-col gap-3">
                {SOLUCOES.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Divisor vertical desktop */}
          <div className="hidden lg:block w-px self-stretch bg-white/20 mx-6" />

          {/* Col 4 — Unidades */}
          <div className="md:flex-1 md:px-6">
            <AccordionSection title="Unidades">
              <ul className="flex flex-col gap-4">
                {UNIDADES.map((u) => (
                  <li key={u.label} className="flex flex-col gap-2">
                    <span className="text-sm font-normal text-white">
                      {u.label}
                    </span>
                    <span className="text-sm font-normal text-white/70 leading-snug">
                      {u.descricao}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contato"
                className="mt-4 inline-block rounded-[8px] border border-white/40 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#00497F]"
              >
                Contato
              </Link>
            </AccordionSection>
          </div>

          {/* Divisor vertical desktop */}
          <div className="hidden lg:block w-px self-stretch bg-white/20 mx-6" />

          {/* Col 5 — Contato Rápido */}
          <div className="md:flex-1 md:pl-6">
            <AccordionSection title="Contato Rápido">
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2.5">
                  <ContactIcon name="icon-phone" />
                  <a
                    href="tel:5137313426"
                    className="text-sm font-normal text-white/70 hover:text-white transition-colors"
                  >
                    (51) 3731 3426
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <ContactIcon name="icon-whatsapp" />
                  <a
                    href="https://wa.me/5551983431014"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-normal text-white/70 hover:text-white transition-colors"
                  >
                    (51) 98343 1014
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <ContactIcon name="icon-clock" />
                  <span className="text-sm font-normal text-white/70 whitespace-nowrap">
                    Seg. a Sex. 8h às 18h
                  </span>
                </li>
              </ul>
              <Link
                href="#cliente"
                className="mt-4 inline-block rounded-[8px] bg-[#006EB7] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7]"
              >
                Área do Cliente
              </Link>
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* ── Rodapé inferior ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-3 px-5 py-4 md:flex-row md:px-12">
          <p className="text-xs font-normal text-gray-600">
            Desenvolvido por{" "}
            <a
              href="https://megusta.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Me Gusta
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/termos-de-servico"
              className="text-xs font-normal text-gray-600 transition-colors hover:text-gray-900"
            >
              Termos de Serviço
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/politica-de-privacidade"
              className="text-xs font-normal text-gray-600 transition-colors hover:text-gray-900"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
