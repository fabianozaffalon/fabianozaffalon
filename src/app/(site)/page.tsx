import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Brands } from "@/components/sections/Brands";
import { About } from "@/components/sections/About";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";

const HOME_TITLE = "Fabiano Zaffalon Distribuidora | Movidos pelos desafios";

export const revalidate = 3600;

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description:
      "Distribuidora consolidada no mercado, com amplo portfólio de produtos das melhores marcas. Soluções para varejo, food service e indústria no Rio Grande do Sul.",
    path: "/",
  }),
  // bypassa o title.template do layout raiz, que duplicaria o sufixo "| Fabiano Zaffalon"
  title: { absolute: HOME_TITLE },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Brands />
      <About />
      <CtaBanner />
      <News />
      <Contact />
    </>
  );
}
