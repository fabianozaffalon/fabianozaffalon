import type { Metadata } from "next";
import { Suspense } from "react";
import { ContatoSection } from "@/components/sections/contato/ContatoSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description: "Entre em contato ou candidate-se a uma vaga na Fabiano Zaffalon Distribuidora.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <Suspense fallback={null}>
      <ContatoSection />
    </Suspense>
  );
}
