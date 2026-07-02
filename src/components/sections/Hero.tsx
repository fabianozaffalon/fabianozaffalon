"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ConsultorButton,
  useConsultorModal,
} from "@/components/sections/ConsultorModal";

const SLIDES = [
  {
    id: 1,
    image: "/images/hero/slide-1.png",
    imageMobile: "/images/hero/slide-1-mobile.png",
    title: "Distribuir é assumir desafios",
    subtitle:
      "Do varejo à indústria, você precisa de um parceiro comprometido com o seu resultado.",
    cta: {
      label: "QUERO FALAR COM UM CONSULTOR",
      type: "modal", // Slide 1 - Modal
    },
  },
  {
    id: 2,
    image: "/images/hero/slide-2.png",
    imageMobile: "/images/hero/slide-2-mobile.png",
    title: "INDÚSTRIA: Seu objetivo é ser líder no seu segmento?",
    subtitle: "SOMOS MOVIDOS PELOS SEUS DESAFIOS.",
    cta: {
      label: "QUERO FALAR COM UM CONSULTOR",
      type: "modal", // Slide 2 - Modal
    },
  },
  {
    id: 3,
    image: "/images/hero/slide-3.png",
    imageMobile: "/images/hero/slide-3-mobile.png",
    title: "VAREJO: Precisa um parceiro que respeita o seu espaço?",
    subtitle: "SOMOS MOVIDOS PELOS SEUS DESAFIOS.",
    cta: {
      label: "QUERO FALAR COM UM CONSULTOR",
      type: "modal", // Slide 3 - Modal
    },
  },
  {
    id: 4,
    image: "/images/hero/slide-4.png",
    imageMobile: "/images/hero/slide-4-mobile.png",
    title: "FOOD SERVICE: Precisa das melhores marcas no tempo certo?",
    subtitle: "SOMOS MOVIDOS PELOS SEUS DESAFIOS.",
    cta: {
      label: "QUERO FALAR COM UM CONSULTOR",
      type: "modal", // Slide 4 - Modal
    },
  },
  {
    id: 5,
    image: "/images/hero/slide-5.png",
    imageMobile: "/images/hero/slide-5-mobile.png",
    title: "Saiba como fazemos a diferença.",
    subtitle: "Processos, tecnologia e uma cultura de confiança e respeito.",
    cta: {
      label: "CONHEÇA A FABIANO ZAFFALON",
      href: "/empresa", // Slide 5 - Link normal
      type: "link",
    },
  },
];

const AUTOPLAY_MS = 5000;

// ─── Componente CTA Renderer ────────────────────────────────────────────────
function CTARenderer({ slide }: { slide: (typeof SLIDES)[0] }) {
  const { abrir } = useConsultorModal();

  // Estilos comuns para ambos os casos
  const baseStyles =
    "mt-4 inline-flex w-full md:w-auto items-center justify-center rounded-[8px] bg-[#006EB7] px-6 md:px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  // Se for modal (slides 1-4)
  if (slide.cta.type === "modal") {
    return (
      <button onClick={abrir} className={baseStyles}>
        {slide.cta.label}
      </button>
    );
  }

  // Se for link (slide 5)
  return (
    <Link href={slide.cta.href!} className={baseStyles}>
      {slide.cta.label}
    </Link>
  );
}

// ─── WhatsApp flutuante ───────────────────────────────────────────────────────
export function WhatsAppButton() {
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        @keyframes wa-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .wa-btn { animation: wa-float 3s ease-in-out infinite; }
        .wa-btn:hover { animation: none; transform: scale(1.08); transition: transform 0.2s ease; }
        .wa-ring { animation: wa-pulse 2.4s ease-out infinite; border-radius: 9999px; }
      `}</style>
      <a
        href="https://wa.me/555332734110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-4 z-50 md:right-6"
      >
        <div className="wa-ring wa-btn relative flex h-14 w-14 items-center justify-center">
          <Image
            src="/images/ui/elipse-whats.svg"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
          <Image
            src="/images/ui/whats.svg"
            alt=""
            aria-hidden="true"
            width={30}
            height={30}
            className="relative z-10"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </a>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 36.46vw, 700px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Carrossel principal"
      aria-roledescription="carousel"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          inert={i !== current ? true : undefined}
          className={
            "absolute inset-0 transition-opacity duration-700 " +
            (i === current
              ? "opacity-100 z-10 pointer-events-auto"
              : "opacity-0 z-0 pointer-events-none")
          }
        >
          {/* Imagem mobile — portrait 750x900, só em telas pequenas */}
          <Image
            src={slide.imageMobile}
            alt={slide.title}
            fill
            priority={i === 0}
            loading="eager"
            className="object-cover object-top md:hidden"
            sizes="(max-width: 768px) 100vw, 0px"
          />

          {/* Imagem desktop — landscape 1920x700, só em telas md+ */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            loading="eager"
            className="hidden object-cover object-center md:block"
            sizes="(min-width: 768px) 100vw, 0px"
          />

          {/* Overlay mobile — gradiente top-to-bottom para texto no topo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent md:hidden" />

          {/* Overlay desktop — gradiente lateral original */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/25 to-transparent md:block" />

          {/* Conteúdo */}
          <div className="absolute inset-0 flex md:items-center">
            <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
              {/* Mobile — texto no topo dentro dos 250px livres */}
              <div className="pt-6 md:hidden">
                <h1
                  className="font-black text-white leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)" }}
                >
                  {slide.title}
                </h1>
                <CTARenderer slide={slide} />
              </div>

              {/* Desktop — layout original */}
              <div className="hidden md:block max-w-[520px]">
                <h1
                  className="font-black text-white leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 4vw, 2.75rem)" }}
                >
                  {slide.title}
                </h1>
                <p
                  className="mt-3 font-normal text-white/90 leading-relaxed"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
                >
                  {slide.subtitle}
                </p>
                <CTARenderer slide={slide} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Setas — só desktop */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 md:left-5 md:h-12 md:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 md:right-5 md:h-12 md:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === current}
            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span
              className={
                "block rounded-full transition-all duration-300 " +
                (i === current
                  ? "w-6 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/80 hover:bg-white")
              }
            />
          </button>
        ))}
      </div>
    </section>
  );
}
