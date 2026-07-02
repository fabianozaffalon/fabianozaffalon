export type UnidadeId = "pelotas" | "rio-pardo" | "broker";

export interface Unidade {
  id: UnidadeId;
  label: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
  email: string;
  whatsappHref: string;
  /** Usado no ContatoSection.tsx (aba "Fale com a gente") */
  horario?: string;
  /** URL do embed do Google Maps, usado no ContatoSection.tsx */
  mapSrc?: string;
}

export const UNIDADES: Unidade[] = [
  {
    id: "pelotas",
    label: "Pelotas",
    endereco: "Rua Santa Clara, nº 02 – Três Vendas – Pelotas/RS, Brasil",
    telefone: "(53) 3273-4110",
    whatsapp: "(53) 3273-4110",
    email: "contatopel@fzltda.com.br",
    whatsappHref: "https://wa.me/555332734110",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8!2d-52.3441931567227!3d-31.72557873927473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b5364df1a70b%3A0x9c9c1dc6e84fcff1!2sFabiano%20Zaffalon%20%26%20Cia%20Ltda!5e0!3m2!1spt-BR!2sbr!4v1780699770282!5m2!1spt-BR!2sbr",
  },
  {
    id: "rio-pardo",
    label: "Rio Pardo",
    endereco:
      "BR 471, km 156 nº 711 – Distrito Industrial – Rio Pardo/RS, Brasil",
    telefone: "(51) 3731-3426",
    whatsapp: "(51) 3731-3426",
    email: "contatorp@fzltda.com.br",
    whatsappHref: "https://wa.me/555137313426",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.5574991234867!2d-52.370674523675916!3d-29.992144528854485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d50f343e89f%3A0x867ab75970d1df6c!2sFabiano%20Zaffalon%20e%20Cia%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1782987945128!5m2!1spt-BR!2sbr",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    endereco:
      "BR 471, km 156 nº 711 – Distrito Industrial – Rio Pardo/RS, Brasil",
    telefone: "(51) 3731-3426",
    whatsapp: "(51) 3731-3426",
    email: "starb@fzltda.com.br",
    whatsappHref: "https://wa.me/555137313426",
    horario: "Seg. a Sex. 8h às 18h",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1033.7426768929695!2d-52.3678330891196!3d-29.992139473485718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951b5d9864ddbed9%3A0x8926895859d25f7f!2sNestl%C3%A9%20Rio%20Pardo!5e0!3m2!1spt-BR!2sbr!4v1780699898789!5m2!1spt-BR!2sbr",
  },
];
