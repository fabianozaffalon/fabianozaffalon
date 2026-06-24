import type { Metadata } from "next";
import { FaqHero }    from "@/components/sections/faq/FaqHero";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { Contact }    from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "FAQ — Perguntas Frequentes",
    description:
      "Tire suas dúvidas sobre distribuição, logística, varejo e nossas soluções. Respostas claras e objetivas da Fabiano Zaffalon Distribuidora.",
    path: "/faq",
  }),
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
