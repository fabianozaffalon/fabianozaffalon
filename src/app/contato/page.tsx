import type { Metadata } from "next";
import { ContatoHero }    from "@/components/sections/contato/ContatoHero";
import { ContatoSection } from "@/components/sections/contato/ContatoSection";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Fabiano Zaffalon. Fale com nossa equipe, envie seu currículo ou faça um pedido. Unidades em Pelotas e Rio Pardo.",
};

export default function ContatoPage() {
  return (
    <>
      <ContatoHero />
      <ContatoSection />
    </>
  );
}
