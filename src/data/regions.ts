// src/data/regions.ts
// Fonte única de verdade para os dados das regiões.
// Importado por: About.tsx (home) e EmpresaOndeEstamos.tsx (página empresa)

export const REGIONS = [
  {
    id: "sul",
    label: "Região Sul",
    sede: "Pelotas - RS",
    map: "/images/maps/mapa-sul.svg",
    mapAlt: "Mapa da Região Sul",
    cities: [
      "Pelotas - RS", "Rio Grande - RS", "Bagé - RS", "Uruguaiana - RS",
      "Santana do Livramento - RS", "São Gabriel - RS", "Camaquã - RS",
      "Canguçu - RS", "Jaguarão - RS", "Pinheiro Machado - RS",
      "Arroio Grande - RS", "Herval - RS", "Pedras Altas - RS",
      "Aceguá - RS", "Dom Pedrito - RS", "Lavras do Sul - RS",
      "Caçapava do Sul - RS", "São Lourenço do Sul - RS",
      "Turuçu - RS", "Capão do Leão - RS",
      // Adicione as demais cidades aqui (total: 48)
    ],
    description:
      "Atendemos toda a região Sul do estado com uma estrutura logística robusta, garantindo entregas pontuais e um atendimento consultivo de excelência.",
    whatsapp: "5551999999999",
    phone: "+5551999999999",
    orderLink: "#contato",
  },
  {
    id: "central",
    label: "Região Central",
    sede: "Rio Pardo - RS",
    map: "/images/maps/mapa-central.svg",
    mapAlt: "Mapa da Região Central",
    cities: [
      "Rio Pardo - RS", "Santa Cruz do Sul - RS", "Lajeado - RS",
      "Cachoeira do Sul - RS", "Venâncio Aires - RS", "Montenegro - RS",
      "Estrela - RS", "Candelária - RS", "São Leopoldo - RS",
      "Taquari - RS", "Encruzilhada do Sul - RS", "Pantano Grande - RS",
      "General Câmara - RS", "Triunfo - RS", "São Jerônimo - RS",
      "Butiá - RS", "Arroio dos Ratos - RS", "Charqueadas - RS",
      "Eldorado do Sul - RS", "Guaíba - RS",
      // Adicione as demais cidades aqui (total: 127)
    ],
    description:
      "Nossa cobertura na região Central conecta os principais polos comerciais e industriais, assegurando presença constante e suporte ágil.",
    whatsapp: "5551988888888",
    phone: "+5551988888888",
    orderLink: "#contato",
  },
  {
    id: "broker",
    label: "Broker Nestlé",
    sede: "Rio Pardo - RS",
    map: "/images/maps/mapa-broker.svg",
    mapAlt: "Mapa Broker Nestlé",
    cities: [
      "Rio Pardo - RS", "Porto Alegre - RS", "Canoas - RS",
      "Novo Hamburgo - RS", "São Leopoldo - RS", "Gravataí - RS",
      "Viamão - RS", "Alvorada - RS", "Cachoeirinha - RS",
      "Sapucaia do Sul - RS", "Esteio - RS", "Sapiranga - RS",
      "Campo Bom - RS", "Estância Velha - RS", "Dois Irmãos - RS",
      "Ivoti - RS", "Portão - RS", "São Carlos - RS",
      "Taquara - RS", "Parobé - RS",
      // Adicione as demais cidades aqui (total: 92)
    ],
    description:
      "Como Broker oficial Nestlé, operamos na Grande Porto Alegre levando as melhores marcas, produtos e lançamentos diretamente ao ponto de venda.",
    whatsapp: "5551977777777",
    phone: "+5551977777777",
    orderLink: "#contato",
  },
];

export type Region = typeof REGIONS[0];
