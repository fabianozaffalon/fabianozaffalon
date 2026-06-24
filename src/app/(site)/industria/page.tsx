import type { Metadata } from "next";
import { IndustriaHero }        from "@/components/sections/industria/IndustriaHero";
import { IndustriaApresentacao } from "@/components/sections/industria/IndustriaApresentacao";
import { IndustriaCards }       from "@/components/sections/industria/IndustriaCards";
import { IndústariaCases }      from "@/components/sections/industria/IndústariaCases";
import { CtaBannerSimples }     from "@/components/sections/CtaBannerSimples";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Indústria",
  description:
    "Por que distribuir com a Fabiano Zaffalon? Estrutura sólida, logística eficiente e uma rede com mais de 7 mil pontos de venda no Rio Grande do Sul para conectar sua marca ao mercado.",
  path: "/industria",
});

export default function IndustriaPage() {
  return (
    <>
      <IndustriaHero />
      <IndustriaApresentacao />
      <IndustriaCards />
      <IndústariaCases />
      <CtaBannerSimples />
    </>
  );
}
