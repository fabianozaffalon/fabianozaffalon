"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ATUACAO_LINKS = [
  { label: "Varejo", href: "/varejo" },
  { label: "Food Service", href: "/foodservice" },
  { label: "Indústria", href: "/industria" },
];

const CONTATO_LINKS = [
  { label: "Fale com a gente", href: "/contato" },
  { label: "Trabalhe Conosco", href: "/contato?aba=trabalhe-conosco" },
];

const NAV_LINKS = [
  { label: "A Empresa", href: "/empresa", dropdown: null },
  { label: "Broker Nestlé", href: "/broker-nestle", dropdown: null },
  { label: "Atuação", href: "#solucoes", dropdown: ATUACAO_LINKS },
  { label: "FAQ", href: "/faq", dropdown: null },
  { label: "Notícias", href: "/noticias", dropdown: null },
  { label: "Contato", href: "/contato", dropdown: CONTATO_LINKS },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contatoDropdownOpen, setContatoDropdownOpen] = useState(false);
  const [mobileAtuacaoOpen, setMobileAtuacaoOpen] = useState(false);
  const [mobileContatoOpen, setMobileContatoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contatoDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contatoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shrink no scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setMobileAtuacaoOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const close = () => {
    setMenuOpen(false);
    setMobileAtuacaoOpen(false);
    setMobileContatoOpen(false);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const handleContatoEnter = () => {
    if (contatoTimerRef.current) clearTimeout(contatoTimerRef.current);
    setContatoDropdownOpen(true);
  };

  const handleContatoLeave = () => {
    contatoTimerRef.current = setTimeout(() => setContatoDropdownOpen(false), 120);
  };

  return (
    <>
      {/* ── Barra principal ── */}
      <header
        className={
          "sticky top-0 z-50 w-full bg-white transition-shadow duration-300 " +
          (scrolled ? "shadow-md" : "shadow-sm")
        }
      >
        <div
          className={
            "mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-all duration-300 " +
            (scrolled ? "h-[72px] lg:h-[80px]" : "h-[90px] lg:h-[110px]")
          }
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center" onClick={close}>
            <Image
              src="/images/logo.png"
              alt="Fabiano Zaffalon Distribuidora"
              width={230}
              height={80}
              priority
              className={
                "transition-all duration-300 " +
                (scrolled ? "w-[150px] md:w-[180px]" : "w-[180px] md:w-[230px]")
              }
              style={{ height: "auto" }}
            />
          </Link>

          {/* Nav desktop */}
          <nav
            className="hidden items-center gap-5 lg:flex xl:gap-7"
            aria-label="Menu principal"
          >
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  ref={link.label === "Atuação" ? dropdownRef : contatoDropdownRef}
                  className="relative"
                  onMouseEnter={link.label === "Atuação" ? handleDropdownEnter : handleContatoEnter}
                  onMouseLeave={link.label === "Atuação" ? handleDropdownLeave : handleContatoLeave}
                >
                  <button
                    className={
                      "flex items-center gap-1 font-sans text-sm transition-colors hover:text-[#006EB7] focus:outline-none " +
                      (link.dropdown.some((sub) => pathname === sub.href)
                        ? "font-semibold text-[#006EB7]"
                        : "font-normal text-[#595959]")
                    }
                    aria-haspopup="true"
                    aria-expanded={link.label === "Atuação" ? dropdownOpen : contatoDropdownOpen}
                    onClick={() => link.label === "Atuação"
                      ? setDropdownOpen((v) => !v)
                      : setContatoDropdownOpen((v) => !v)
                    }
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={
                        "h-4 w-4 transition-transform duration-200 " +
                        ((link.label === "Atuação" ? dropdownOpen : contatoDropdownOpen)
                          ? "rotate-180 text-[#006EB7]"
                          : "")
                      }
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    className={
                      "absolute left-0 top-full pt-3 transition-all duration-200 " +
                      ((link.label === "Atuação" ? dropdownOpen : contatoDropdownOpen)
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0")
                    }
                  >
                    <div className="w-44 overflow-hidden rounded-[10px] border border-gray-100 bg-white shadow-lg shadow-black/10">
                      {link.dropdown.map((sub, idx) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => {
                            setDropdownOpen(false);
                            setContatoDropdownOpen(false);
                          }}
                          className={
                            "block px-4 py-3 text-sm text-[#595959] transition-colors hover:bg-[#f0f7ff] hover:text-[#006EB7] " +
                            (idx !== 0 ? "border-t border-gray-100" : "")
                          }
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    "font-sans text-sm whitespace-nowrap transition-colors hover:text-[#006EB7] " +
                    (pathname === link.href
                      ? "font-semibold text-[#006EB7]"
                      : "font-normal text-[#595959]")
                  }
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA desktop — apenas Área do Cliente */}
          <div className="hidden items-center lg:flex">
            <Link
              href="#cliente"
              className="flex items-center gap-1.5 rounded-[8px] border-2 border-[#006EB7] bg-[#006EB7] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
              Área do Cliente
            </Link>
          </div>

          {/* Hamburguer mobile */}
          <button
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[8px] lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={
                "block h-0.5 w-6 rounded-full transition-all duration-300 " +
                (menuOpen
                  ? "translate-y-[7px] rotate-45 bg-white"
                  : "bg-[#595959]")
              }
            />
            <span
              className={
                "block h-0.5 w-6 rounded-full transition-all duration-300 " +
                (menuOpen ? "opacity-0" : "bg-[#595959]")
              }
            />
            <span
              className={
                "block h-0.5 w-6 rounded-full transition-all duration-300 " +
                (menuOpen
                  ? "-translate-y-[7px] -rotate-45 bg-white"
                  : "bg-[#595959]")
              }
            />
          </button>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden " +
          (menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Painel mobile ── */}
      <div
        className={
          "fixed inset-y-0 right-0 z-50 flex w-[300px] flex-col bg-[#00497F] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden " +
          (menuOpen ? "translate-x-0" : "translate-x-full")
        }
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        {/* Header do painel */}
        <div className="flex items-center border-b border-white/10 px-6 py-5">
          <Image
            src="/images/logo-white.svg"
            alt="Fabiano Zaffalon Distribuidora"
            width={150}
            height={54}
            className="h-auto w-[150px]"
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-0.5 overflow-y-auto px-4 pt-5 pb-4">
          {NAV_LINKS.map((link, i) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => link.label === "Atuação"
                    ? setMobileAtuacaoOpen((v) => !v)
                    : setMobileContatoOpen((v) => !v)
                  }
                  className="flex w-full items-center justify-between rounded-[8px] px-3 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="h-px w-4 shrink-0 bg-white/30" />
                    {link.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={
                      "h-4 w-4 transition-transform duration-200 " +
                      ((link.label === "Atuação" ? mobileAtuacaoOpen : mobileContatoOpen) ? "rotate-180" : "")
                    }
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={
                    "overflow-hidden transition-all duration-200 " +
                    ((link.label === "Atuação" ? mobileAtuacaoOpen : mobileContatoOpen)
                      ? "max-h-48 opacity-100"
                      : "max-h-0 opacity-0")
                  }
                >
                  <div className="ml-10 flex flex-col gap-0.5 pb-1">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={close}
                        className="rounded-[6px] px-3 py-2.5 text-sm font-normal text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={close}
                className={
                  "flex items-center gap-3 rounded-[8px] px-3 py-3.5 text-base transition-colors hover:bg-white/10 hover:text-white " +
                  (pathname === link.href
                    ? "font-semibold text-white bg-white/10"
                    : "font-medium text-white/80")
                }
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <span
                  className={
                    "h-px w-4 shrink-0 " +
                    (pathname === link.href ? "bg-white" : "bg-white/30")
                  }
                />
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="mx-6 border-t border-white/10" />

        {/* CTA mobile */}
        <div className="flex flex-col gap-3 px-6 pt-5">
          <Link
            href="#cliente"
            onClick={close}
            className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-[#006EB7] bg-[#006EB7] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            Área do Cliente
          </Link>
        </div>

        <div className="mt-auto border-t border-white/10 px-6 py-5">
          <p className="text-center text-xs text-white/40">
            Fabiano Zaffalon Distribuidora
          </p>
        </div>
      </div>
    </>
  );
}
