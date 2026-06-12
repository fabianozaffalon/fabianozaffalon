import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Brands } from "@/components/sections/Brands";
import { About } from "@/components/sections/About";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";

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
