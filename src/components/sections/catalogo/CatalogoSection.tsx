import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CatalogoTabs } from "./CatalogoTabs";

const UNIDADES = [
  { id: "sul",     label: "Região Sul",     sublabel: "Pelotas – RS"  },
  { id: "central", label: "Região Central", sublabel: "Rio Pardo – RS" },
  { id: "broker",  label: "Broker Nestlé",  sublabel: "Rio Pardo – RS" },
];

const mapaMap: Record<string, string> = {
  sul:     "/images/maps/sul-catalogo.svg",
  central: "/images/maps/central-catalogo.svg",
  broker:  "/images/maps/broker-catalogo.svg",
};

export async function CatalogoSection() {
  // Busca todas as marcas ativas de uma vez — filtra no client por unidade
  const marcas = await prisma.marca.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });

  // Serializa para passar ao Client Component
  const marcasSerializadas = marcas.map((m) => ({
    id: m.id,
    name: m.name,
    logo: m.logo,
    catalogoPdf: m.catalogoPdf,
    unidades: m.unidades,
  }));

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <CatalogoTabs
          unidades={UNIDADES}
          marcas={marcasSerializadas}
          mapaMap={mapaMap}
        />
      </div>
    </section>
  );
}
