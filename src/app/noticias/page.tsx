import type { Metadata } from "next";
import { NoticiasHero }    from "@/components/sections/noticias/NoticiasHero";
import { NoticiasContent } from "@/components/sections/noticias/NoticiasContent";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Fique por dentro das novidades, lançamentos, parcerias e conquistas da Fabiano Zaffalon Distribuidora.",
};

export default function NoticiasPage() {
  return (
    <>
      <NoticiasHero />
      <NoticiasContent />
    </>
  );
}
