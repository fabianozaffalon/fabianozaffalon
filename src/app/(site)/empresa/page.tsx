import type { Metadata } from "next";
import { EmpresaHero } from "@/components/sections/empresa/EmpresaHero";
import { EmpresaAbout } from "@/components/sections/empresa/EmpresaAbout";
import { EmpresaVideo } from "@/components/sections/empresa/EmpresaVideo";
import { EmpresaOndeEstamos } from "@/components/sections/empresa/EmpresaOndeEstamos";
import { Brands } from "@/components/sections/Brands";
import { EmpresaCultura } from "@/components/sections/empresa/EmpresaCultura";
import { EmpresaRede } from "@/components/sections/empresa/EmpresaRede";
import { EmpresaCases } from "@/components/sections/empresa/EmpresaCases";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "A Empresa",
  description:
    "Conheça a história, estrutura e valores da Fabiano Zaffalon Distribuidora — quase 30 anos conectando grandes marcas ao mercado do Sul do Brasil.",
  path: "/empresa",
});

export default function EmpresaPage() {
  return (
    <>
      <EmpresaHero />
      <EmpresaAbout />
      <EmpresaVideo />
      <EmpresaOndeEstamos />
      <Brands />
      <EmpresaCultura />
      <EmpresaRede />
      <EmpresaCases />
      <CtaBanner />
      <Contact />
    </>
  );
}
