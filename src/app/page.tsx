import { Hero } from "@/components/sections/Hero";
import { WhatsAppButton } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Brands } from "@/components/sections/Brands";
import { About } from "@/components/sections/About";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* S1 - Hero */}
      <Hero />
      <WhatsAppButton />

      {/* S2 - Nossas Soluções */}
      <Solutions />

      {/* S3 - Marcas que Representamos */}
      <Brands />

      {/* S4 - A Empresa */}
      <About />

      {/* S5 - CTA Banner */}
      <CtaBanner />

      {/* S6 - News */}
      <News />

      {/* S7 - Contato */}
      <Contact />
    </>
  );
}
