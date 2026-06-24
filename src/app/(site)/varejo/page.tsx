import type { Metadata } from "next";
import { VarejoHero } from "@/components/sections/varejo/VarejoHero";
import { VarejoApresentacao } from "@/components/sections/varejo/VarejoApresentacao";
import {
  VarejoLocal,
  VarejoMedioGrande,
} from "@/components/sections/varejo/VarejoCards";
import { VarejoBeneficios } from "@/components/sections/varejo/VarejoBeneficios";
import { VarejoPortfolio } from "@/components/sections/varejo/VarejoPortfolio";
import { VarejoCampanha } from "@/components/sections/varejo/VarejoCampanha";
import { CtaBannerSimples } from "@/components/sections/CtaBannerSimples";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Varejo",
  description:
    "Soluções de distribuição para o varejo local, médio e grande. A Fabiano Zaffalon conecta grandes marcas ao seu negócio com eficiência, proximidade e compromisso.",
  path: "/varejo",
  image: "/images/varejo/hero-varejo.jpg",
});

export default function VarejoPage() {
  return (
    <>
      <VarejoHero />
      <VarejoApresentacao />
      <VarejoLocal />
      <VarejoMedioGrande />
      <VarejoBeneficios />
      <VarejoPortfolio />
      <VarejoCampanha />
      <CtaBannerSimples />
    </>
  );
}
