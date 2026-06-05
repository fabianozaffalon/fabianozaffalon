import type { Metadata } from "next";
import { FaqHero }    from "@/components/sections/faq/FaqHero";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { Contact }    from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "FAQ — Perguntas Frequentes",
  description:
    "Tire suas dúvidas sobre distribuição, logística, varejo e nossas soluções. Respostas claras e objetivas da Fabiano Zaffalon Distribuidora.",
  keywords: [
    "FAQ distribuidora",
    "perguntas frequentes distribuição",
    "logística alimentar",
    "varejo food service",
    "dúvidas distribuidora",
  ],
};

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqSection />
      <Contact />
    </>
  );
}
