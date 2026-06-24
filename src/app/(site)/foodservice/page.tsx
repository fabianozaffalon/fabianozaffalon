import type { Metadata } from "next";
import { FoodServiceHero } from "@/components/sections/foodservice/FoodServiceHero";
import { FoodServiceApresentacao } from "@/components/sections/foodservice/FoodServiceApresentacao";
import { FoodServicePortfolio } from "@/components/sections/foodservice/FoodServicePortfolio";
import { FoodServiceBeneficios } from "@/components/sections/foodservice/FoodServiceBeneficios";
import { FoodServiceCampanha } from "@/components/sections/foodservice/FoodServiceCampanha";
import { CtaBannerSimples } from "@/components/sections/CtaBannerSimples";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Food Service",
  description:
    "Distribuição para restaurantes, padarias, hotéis e cozinhas industriais. A Fabiano Zaffalon garante abastecimento constante, marcas líderes e atendimento especializado para o seu negócio.",
  path: "/foodservice",
});

export default function FoodServicePage() {
  return (
    <>
      <FoodServiceHero />
      <FoodServiceApresentacao />
      <FoodServicePortfolio />
      <FoodServiceBeneficios />
      <FoodServiceCampanha />
      <CtaBannerSimples />
    </>
  );
}
