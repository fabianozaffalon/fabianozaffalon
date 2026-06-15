import type { Metadata } from "next";
import { BrokerHero }        from "@/components/sections/broker/BrokerHero";
import { BrokerApresentacao } from "@/components/sections/broker/BrokerApresentacao";
import { BrokerVideo }        from "@/components/sections/broker/BrokerVideo";
import { BrokerCultura }      from "@/components/sections/broker/BrokerCultura";
import { BrokerRede }         from "@/components/sections/broker/BrokerRede";
import { BrokerStarB }        from "@/components/sections/broker/BrokerStarB";
import { BrokerBanner }       from "@/components/sections/broker/BrokerBanner";
import { CtaBannerSimples }   from "@/components/sections/CtaBannerSimples";
import { BrokerOndeEstamos }  from "@/components/sections/broker/BrokerOndeEstamos";

export const metadata: Metadata = {
  title: "Broker Nestlé",
  description:
    "Conheça a operação Broker Nestlé da Fabiano Zaffalon — parceria exclusiva construída com trabalho, comprometimento e resultados consistentes.",
};

export default function BrokerNestlePage() {
  return (
    <>
      <BrokerHero />
      <BrokerApresentacao />
      <BrokerVideo />
      <BrokerCultura />
      <BrokerRede />
      <BrokerStarB />
      <BrokerBanner />
      <CtaBannerSimples />
      <BrokerOndeEstamos />
    </>
  );
}
