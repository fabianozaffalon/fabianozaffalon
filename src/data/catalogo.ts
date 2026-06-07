// src/data/catalogo.ts

export type Marca = {
  id: string;
  name: string;
  logo: string;
  size?: "md" | "lg" | "xl";
};

export type UnidadeCatalogo = {
  id: string;
  label: string;
  sublabel: string;
  marcas: Marca[];
};

const MARCAS_SUL_CENTRAL: Marca[] = [
  {
    id: "suzano",
    name: "Suzano",
    logo: "/images/catalogo/logos/suzano.svg",
    size: "lg",
  },
  {
    id: "piraque",
    name: "Piraquê",
    logo: "/images/catalogo/logos/piraque.svg",
    size: "lg",
  },
  {
    id: "ype",
    name: "Ypê",
    logo: "/images/catalogo/logos/ype.svg",
    size: "lg",
  },
  {
    id: "havaianas",
    name: "Havaianas",
    logo: "/images/catalogo/logos/havaianas.svg",
    size: "4xl",
  },
  {
    id: "yoki",
    name: "Yoki",
    logo: "/images/catalogo/logos/yoki.svg",
    size: "lg",
  },
  {
    id: "seara",
    name: "Seara",
    logo: "/images/catalogo/logos/seara.svg",
    size: "xl",
  },
  {
    id: "bunge",
    name: "Bunge",
    logo: "/images/catalogo/logos/bunge.svg",
    size: "4xl",
  },
  {
    id: "kimberly",
    name: "Kimberly-Clark",
    logo: "/images/catalogo/logos/kimberly.svg",
    size: "4xl",
  },
  {
    id: "condor",
    name: "Condor",
    logo: "/images/catalogo/logos/condor.svg",
    size: "xl",
  },
  {
    id: "isabela",
    name: "Isabela",
    logo: "/images/catalogo/logos/isabela.svg",
    size: "xl",
  },
  {
    id: "bic",
    name: "BIC",
    logo: "/images/catalogo/logos/bic.svg",
    size: "xl",
  },
  {
    id: "dori",
    name: "Dori",
    logo: "/images/catalogo/logos/dori.svg",
    size: "xl",
  },
  {
    id: "aurea",
    name: "Áurea",
    logo: "/images/catalogo/logos/aurea.svg",
    size: "xl",
  },
];

const MARCAS_BROKER: Marca[] = [
  { id: "nestle", name: "Nestlé", logo: "/images/catalogo/logos/nestle.svg" },
  {
    id: "purina",
    name: "Purina",
    logo: "/images/catalogo/logos/purina.svg",
    size: "xl",
  },
  {
    id: "garoto",
    name: "Garoto",
    logo: "/images/catalogo/logos/garoto.png",
    size: "xl",
  },
  {
    id: "nestle-professional",
    name: "Nestlé Professional",
    logo: "/images/catalogo/logos/nestle-professional.svg",
    size: "4xl",
  },
];

export const UNIDADES_CATALOGO: UnidadeCatalogo[] = [
  {
    id: "sul",
    label: "Região Sul",
    sublabel: "Pelotas – RS",
    marcas: MARCAS_SUL_CENTRAL,
  },
  {
    id: "central",
    label: "Região Central",
    sublabel: "Rio Pardo – RS",
    marcas: MARCAS_SUL_CENTRAL,
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    sublabel: "Rio Pardo – RS",
    marcas: MARCAS_BROKER,
  },
];
