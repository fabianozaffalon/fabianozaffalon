import type { Metadata } from "next";
import { Suspense } from "react";
import { ContatoSection } from "@/components/sections/contato/ContatoSection";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato ou candidate-se a uma vaga na Fabiano Zaffalon Distribuidora.",
};

export default function ContatoPage() {
  return (
    <Suspense fallback={null}>
      <ContatoSection />
    </Suspense>
  );
}
