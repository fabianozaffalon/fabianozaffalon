import type { NavItem, SolutionCard, Brand, Unit } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Vitrejo",     href: "#solucoes" },
  { label: "Food Service",href: "#solucoes" },
  { label: "Indústria",   href: "#solucoes" },
  { label: "A empresa",   href: "#empresa" },
  { label: "Marcas",      href: "#marcas" },
  { label: "Carreiras",   href: "#carreiras" },
  { label: "Contato",     href: "#contato" },
];

export const SOLUTIONS: SolutionCard[] = [
  {
    id: "varejo",
    title: "Nossas Soluções",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien faucibus risus.",
    image: "/images/solutions/varejo.jpg",
  },
  {
    id: "food-service",
    title: "Food Service",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien faucibus risus.",
    image: "/images/solutions/food-service.jpg",
  },
  {
    id: "industria",
    title: "Indústria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien faucibus risus.",
    image: "/images/solutions/industria.jpg",
  },
];

export const BRANDS: Brand[] = [
  { id: "suzano",    name: "Suzano",    logo: "/images/brands/suzano.svg",    alt: "Suzano" },
    { id: "piraque",   name: "Piraquê",   logo: "/images/brands/piraque.svg",   alt: "Piraquê" },
  { id: "bic",       name: "BIC",       logo: "/images/brands/bic.svg",       alt: "BIC" },
  { id: "havaianas", name: "Havaianas", logo: "/images/brands/havaianas.svg", alt: "Havaianas" },
  { id: "yoki",      name: "Yoki",      logo: "/images/brands/yoki.svg",      alt: "Yoki" },
];

export const UNITS: Unit[] = [
  {
    id: "pelotas",
    name: "Pelotas – RS",
    address: "R. Banco Chines, nº 61 – Três Vendas – RS, Brasil",
    phone: "(51) 3733-9494",
    email: "contato@fabianozaffalon.com.br",
  },
];
