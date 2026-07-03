"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FAQ_DATA, type FaqCategory, type FaqItem } from "@/data/faq";

// ── Accordion item ────────────────────────────────────────────────────────────
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={
        "overflow-hidden rounded-[8px] transition-colors duration-200 " +
        (isOpen ? "bg-[#00497F]" : "bg-[#EFEFEF] hover:bg-[#E0E0E0]")
      }
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className={
            "text-sm font-semibold leading-snug " +
            (isOpen ? "text-white" : "text-[#00497F]")
          }
        >
          {item.question}
        </span>

        {/* Ícone + / × */}
        <span
          className={
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors " +
            (isOpen
              ? "border-white text-white"
              : "border-[#00497F] text-[#00497F]")
          }
          aria-hidden="true"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Resposta animada */}
      <div
        className={
          "overflow-hidden transition-all duration-300 ease-in-out " +
          (isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-white/90">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// ── Sidebar vertical de categorias ───────────────────────────────────────────
function CategorySidebar({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Categorias do FAQ">
      {/* Mobile: scroll horizontal em chips */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none -mx-5 px-5">
        {FAQ_DATA.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={
                "snap-start shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap " +
                (isActive
                  ? "bg-[#00497F] text-white"
                  : "bg-[#EFEFEF] text-[#00497F] hover:bg-[#E0E0E0]")
              }
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Desktop: lista vertical sticky */}
      <div className="hidden md:flex flex-col gap-1 sticky top-28">
        {FAQ_DATA.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={
                "group flex items-center gap-3 rounded-[8px] px-4 py-3 text-left text-sm font-semibold transition-all duration-150 " +
                (isActive
                  ? "bg-[#00497F] text-white"
                  : "text-[#00497F] hover:bg-[#EFEFEF]")
              }
            >
              {/* Borda indicadora ativa */}
              <span
                className={
                  "h-4 w-[3px] rounded-full shrink-0 transition-colors duration-150 " +
                  (isActive
                    ? "bg-[#0084E5]"
                    : "bg-transparent group-hover:bg-[#0084E5]/40")
                }
                aria-hidden="true"
              />
              {category.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Card horizontal inferior ──────────────────────────────────────────────────
function FaqBottomCard() {
  return (
    <div className="mt-6">
      {/* Mobile: bola centralizada, metade fora do card */}
      <div className="flex justify-center sm:hidden">
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#006EB7]">
          <Image
            src="/images/icons/icon-faq.svg"
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            className="h-12 w-12 brightness-0 invert"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[16px] bg-[#EFEFEF] -mt-12 px-6 pb-6 pt-16 sm:mt-0 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        {/* Ícone inline — só desktop */}
        <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#006EB7]">
          <Image
            src="/images/icons/icon-faq.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-10 w-10 brightness-0 invert"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-center sm:text-left">
          <p className="text-sm font-black text-[#00497F]">
            Não encontrou sua resposta?
          </p>
          <p className="text-xs leading-relaxed text-[#00497F]/70">
            Nossa equipe está pronta para te ajudar.
          </p>
        </div>

        {/* Divisor vertical — só desktop */}
        <div
          className="hidden sm:block shrink-0 self-stretch w-px bg-[#00497F]/10"
          aria-hidden="true"
        />

        <a
          href="https://wa.me/555332734110"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[8px] bg-[#0084E5] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#006EB7] whitespace-nowrap"
        >
          Converse com um consultor
        </a>
      </div>
    </div>
  );
}

// ── FAQ Section principal ─────────────────────────────────────────────────────
export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_DATA[0].id);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const currentCategory = FAQ_DATA.find(
    (c) => c.id === activeCategory
  ) as FaqCategory;

  const handleTabChange = (id: string) => {
    setActiveCategory(id);
    setOpenItem(null);
  };

  const handleToggle = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr] md:gap-10 md:items-start">
          {/* ── Coluna esquerda — sidebar de categorias ── */}
          <CategorySidebar
            activeCategory={activeCategory}
            onSelect={handleTabChange}
          />

          {/* ── Coluna direita — accordion + card ── */}
          <div className="flex flex-col gap-2">
            {/* Título da categoria ativa */}
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0084E5]">
              {currentCategory.label}
            </p>

            {/* Accordion */}
            <div
              className="flex flex-col gap-2"
              role="list"
              aria-label={`Perguntas sobre ${currentCategory.label}`}
            >
              {currentCategory.items.map((item) => (
                <div key={item.id} role="listitem">
                  <AccordionItem
                    item={item}
                    isOpen={openItem === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                </div>
              ))}
            </div>

            {/* Card horizontal no rodapé */}
            <FaqBottomCard />
          </div>
        </div>
      </div>
    </section>
  );
}
