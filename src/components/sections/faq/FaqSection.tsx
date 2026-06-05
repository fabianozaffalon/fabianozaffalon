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

// ── Card lateral ──────────────────────────────────────────────────────────────
function FaqSideCard() {
  return (
    <div className="sticky top-28 flex flex-col items-center">
      {/* Bola — no topo, na mesma altura do início do accordion */}
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#006EB7] z-10 relative">
        <Image
          src="/images/icons/icon-faq.svg"
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
          className="h-14 w-14 brightness-0 invert"
        />
      </div>

      {/* Card cinza — sobe para cobrir a metade inferior da bola */}
      <div className="flex w-full flex-col items-start rounded-[20px] bg-[#EFEFEF] px-8 pb-10 pt-16 -mt-14">
        {/* Título */}
        <h3
          className="font-black leading-tight text-[#00497F]"
          style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
        >
          Não encontrou
          <br />
          sua resposta?
        </h3>

        {/* Divisor — #0084E5 */}
        <div
          className="my-4 rounded-full bg-[#0084E5]"
          style={{ width: "44px", height: "6px" }}
        />

        {/* Texto */}
        <p className="mb-8 text-sm leading-relaxed text-[#00497F]">
          Nossa equipe esta pronta
          <br />
          para te ajudar.
        </p>

        {/* Botão */}
        <Link
          href="#contato"
          className="w-full rounded-[8px] bg-[#0084E5] px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#006EB7]"
        >
          Converse com um consultor
        </Link>
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:gap-14 md:items-start">
          {/* Coluna esquerda — tabs + accordion */}
          <div className="flex flex-col gap-4">
            {/* Tabs — fullwidth, #00497F ativo */}
            <div
              className="grid w-full overflow-hidden rounded-[8px]"
              style={{ gridTemplateColumns: `repeat(${FAQ_DATA.length}, 1fr)` }}
            >
              {FAQ_DATA.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleTabChange(category.id)}
                  className={
                    "py-3.5 text-xs font-bold uppercase tracking-wider transition-colors " +
                    (activeCategory === category.id
                      ? "bg-[#00497F] text-white"
                      : "bg-[#EFEFEF] text-[#00497F] hover:bg-[#E0E0E0]") +
                    (index < FAQ_DATA.length - 1
                      ? " border-r border-white/20"
                      : "")
                  }
                >
                  {category.label}
                </button>
              ))}
            </div>

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
          </div>

          {/* Coluna direita — card fixo */}
          <FaqSideCard />
        </div>
      </div>
    </section>
  );
}
