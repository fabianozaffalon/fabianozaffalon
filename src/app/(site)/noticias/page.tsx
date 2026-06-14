import type { Metadata } from "next";
import { NoticiasHero } from "@/components/sections/noticias/NoticiasHero";
import { NoticiasList } from "@/components/sections/noticias/NoticiasList";
import { NewsletterBanner } from "@/components/sections/noticias/NewsletterBanner";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Fique por dentro das novidades, lançamentos, parcerias e conquistas da Fabiano Zaffalon Distribuidora.",
};

export default function NoticiasPage() {
  return (
    <>
      <NoticiasHero />
      <NoticiasList />
      <NewsletterBanner />
    </>
  );
}
