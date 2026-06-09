// src/data/catalogo.ts

export type Marca = {
  id: string;
  name: string;
  logo: string;
  catalogoPdf?: string; // ← preparado para fase dinâmica
};

export type UnidadeCatalogo = {
  id: string;
  label: string;
  sublabel: string;
  marcas: Marca[];
};

const MARCAS_SUL_CENTRAL: Marca[] = [
  { id: "suzano",    name: "Suzano",         logo: "/images/catalogo/logos/suzano.svg"    },
  { id: "piraque",   name: "Piraquê",        logo: "/images/catalogo/logos/piraque.svg"   },
  { id: "ype",       name: "Ypê",            logo: "/images/catalogo/logos/ype.svg"       },
  { id: "havaianas", name: "Havaianas",      logo: "/images/catalogo/logos/havaianas.svg" },
  { id: "yoki",      name: "Yoki",           logo: "/images/catalogo/logos/yoki.svg"      },
  { id: "seara",     name: "Seara",          logo: "/images/catalogo/logos/seara.svg"     },
  { id: "bunge",     name: "Bunge",          logo: "/images/catalogo/logos/bunge.svg"     },
  { id: "kimberly",  name: "Kimberly-Clark", logo: "/images/catalogo/logos/kimberly.svg"  },
  { id: "condor",    name: "Condor",         logo: "/images/catalogo/logos/condor.svg"    },
  { id: "isabela",   name: "Isabela",        logo: "/images/catalogo/logos/isabela.svg"   },
  { id: "bic",       name: "BIC",            logo: "/images/catalogo/logos/bic.svg"       },
  { id: "dori",      name: "Dori",           logo: "/images/catalogo/logos/dori.svg"      },
  { id: "aurea",     name: "Áurea",          logo: "/images/catalogo/logos/aurea.svg"     },
];

const MARCAS_BROKER: Marca[] = [
  { id: "nestle",              name: "Nestlé",              logo: "/images/catalogo/logos/nestle.svg"              },
  { id: "purina",              name: "Purina",              logo: "/images/catalogo/logos/purina.svg"              },
  { id: "garoto",              name: "Garoto",              logo: "/images/catalogo/logos/garoto.svg"              },
  { id: "nestle-professional", name: "Nestlé Professional", logo: "/images/catalogo/logos/nestle-professional.svg" },
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
