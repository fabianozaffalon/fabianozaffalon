import type { Metadata } from "next";
import { NoticiasHero } from "@/components/sections/noticias/NoticiasHero";
import { NoticiasList } from "@/components/sections/noticias/NoticiasList";
import { NewsletterBanner } from "@/components/sections/noticias/NewsletterBanner";
import { NoticiasTabs } from "@/components/sections/noticias/NoticiasTabs";
import { InstagramGrid } from "@/components/sections/instagram/InstagramGrid";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Fique por dentro das novidades, lançamentos, parcerias e conquistas da Fabiano Zaffalon Distribuidora.",
};

export default function NoticiasPage() {
  return (
    <>
      <NoticiasHero />
      <div className="pt-10 md:pt-14">
        <NoticiasTabs
          noticiasSlot={<NoticiasList />}
          instagramSlot={<InstagramGrid />}
        />
      </div>
      <NewsletterBanner />
    </>
  );
}
