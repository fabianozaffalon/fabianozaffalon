import type { Metadata } from "next";
import { CatalogoHero }    from "@/components/sections/catalogo/CatalogoHero";
import { CatalogoSection } from "@/components/sections/catalogo/CatalogoSection";
import { CtaBannerSimples } from "@/components/sections/CtaBannerSimples";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Catálogo de Marcas",
  description:
    "Conheça o portfólio completo de marcas distribuídas pela Fabiano Zaffalon em cada região do Rio Grande do Sul.",
  path: "/catalogo",
  image: "/images/catalogo/hero-catalogo.jpg",
});

export default function CatalogoPage() {
  return (
    <>
      <CatalogoHero />
      <CatalogoSection />
      <CtaBannerSimples />
    </>
  );
}
