export interface NavItem {
  label: string;
  href: string;
}

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

export interface Region {
  id: string;
  label: string;
  states: string[];
  description: string;
  address?: string;
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}
