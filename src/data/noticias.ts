// src/data/noticias.ts
// Fonte única de verdade para todas as notícias.
// Home (News.tsx) e página /noticias consomem daqui.
// Quando virar dinâmico, só substitui o array por um fetch do admin.

export type Noticia = {
  id: number;
  slug: string;
  categoria: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  capa: string; // imagem principal — usada na home e nos cards
  fotos: string[]; // até 8 fotos para a matéria completa
  data: string; // ISO 8601 — ex: "2024-11-15"
  destaque: boolean; // true = aparece como notícia principal na página
};

export const NOTICIAS: Noticia[] = [
  {
    id: 1,
    slug: "pdcon-2024",
    categoria: "Conquistas",
    titulo:
      "Fabiano Zaffalon é Destaque na Regional Sul no Programa Pdcon 2024",
    resumo:
      "Fomos reconhecidos com destaque na Regional Sul no PDCON 2024, programa promovido pela Condor, uma das principais marcas do país nos segmentos de limpeza, beleza e higiene.",
    conteudo: `A Fabiano Zaffalon & Cia Ltda tem o orgulho de compartilhar mais uma importante conquista: fomos reconhecidos com destaque na Regional Sul no PDCON 2024, programa promovido pela Condor, uma das principais marcas do país nos segmentos de limpeza, beleza e higiene.

O PDCON (Programa de Desenvolvimento de Condor) é uma iniciativa que estabelece critérios técnicos e metodologias específicas para avaliar a performance dos distribuidores em todo o Brasil, promovendo a excelência operacional, o alinhamento estratégico e a melhoria contínua dos processos.

Receber esse reconhecimento é reflexo do comprometimento diário da nossa equipe, da parceria sólida com a Condor e da confiança dos nossos clientes. Seguimos firmes no propósito de oferecer sempre um serviço de qualidade, com foco em resultados e na valorização de cada elo da nossa cadeia de distribuição.

Agradecemos a Condor pela parceria e confiança, e parabenizamos todos os colaboradores da Fabiano Zaffalon envolvidos nessa conquista!`,
    capa: "/images/noticias/noticia-1/capa.jpg",
    fotos: [
      "/images/noticias/noticia-1/capa.jpg",
      "/images/noticias/noticia-1/foto-2.jpg",
      "/images/noticias/noticia-1/foto-3.jpg",
    ],
    data: "2024-11-15",
    destaque: true,
  },
  {
    id: 2,
    slug: "broker-top1-nestle",
    categoria: "Conquistas",
    titulo:
      "A Resiliência de um Time: Como Conquistamos o Reconhecimento Nacional como Broker Top 1 da Nestlé",
    resumo:
      "Uma trajetória de comprometimento, superação e resultado que nos levou ao reconhecimento nacional como o melhor Broker Nestlé do Brasil.",
    conteudo: `Ser reconhecido como Broker Top 1 da Nestlé no Brasil é resultado de anos de dedicação, parceria e uma equipe que não desiste diante dos desafios.

Nossa operação como Broker Nestlé exige alta performance em todos os indicadores: cobertura, execução, sell-out e relacionamento com o trade. Atingir o topo nacional em todos esses critérios é uma conquista que pertence a cada colaborador que faz parte dessa história.

Agradecemos à Nestlé pela confiança e parceria, e reafirmamos nosso compromisso de manter o alto nível de excelência que nos trouxe até aqui.`,
    capa: "/images/noticias/noticia-2/capa.jpg",
    fotos: ["/images/noticias/noticia-2/capa.jpg"],
    data: "2024-08-20",
    destaque: false,
  },
  {
    id: 3,
    slug: "broker-trajetoria",
    categoria: "Institucional",
    titulo: "Broker Zaffalon: Uma Trajetória de Sucesso e Crescimento",
    resumo:
      "Conheça a história da operação Broker da Fabiano Zaffalon e como ela se consolidou como referência no mercado gaúcho.",
    conteudo: `A operação Broker da Fabiano Zaffalon nasceu da visão de conectar grandes marcas ao mercado de forma estruturada e comprometida.

Ao longo dos anos, construímos uma operação robusta, com equipe especializada, processos definidos e uma cultura voltada para resultados. Essa trajetória nos permitiu crescer de forma consistente e nos consolidar como um dos principais Brokers do Rio Grande do Sul.`,
    capa: "/images/noticias/noticia-3/capa.jpg",
    fotos: ["/images/noticias/noticia-3/capa.jpg"],
    data: "2024-06-10",
    destaque: false,
  },
  {
    id: 4,
    slug: "expansao-novos-mercados",
    categoria: "Institucional",
    titulo: "Expansão da Distribuidora Alcança Novos Mercados no Sul do Brasil",
    resumo:
      "A Fabiano Zaffalon amplia sua presença e chega a novos municípios, fortalecendo a capilaridade da distribuição no Rio Grande do Sul.",
    conteudo: `Com uma estrutura logística cada vez mais robusta, a Fabiano Zaffalon expande sua operação para novos mercados no Sul do Brasil.

Essa expansão reflete nosso comprometimento em levar as melhores marcas a cada ponto de venda, independentemente do porte ou localização.`,
    capa: "/images/noticias/noticia-4/capa.jpg",
    fotos: ["/images/noticias/noticia-4/capa.jpg"],
    data: "2024-04-05",
    destaque: false,
  },
  {
    id: 5,
    slug: "parceria-estrategica",
    categoria: "Parcerias",
    titulo: "Parceria Estratégica Fortalece Portfólio de Marcas Representadas",
    resumo:
      "Novas parcerias ampliam o portfólio da Fabiano Zaffalon, oferecendo mais opções e oportunidades para o varejo gaúcho.",
    conteudo: `A Fabiano Zaffalon fecha novas parcerias estratégicas que fortalecem ainda mais seu portfólio de marcas representadas.

Com mais de 4 mil produtos em linha, seguimos ampliando as possibilidades para nossos parceiros varejistas, food service e indústria.`,
    capa: "/images/noticias/noticia-5/capa.jpg",
    fotos: ["/images/noticias/noticia-5/capa.jpg"],
    data: "2024-02-18",
    destaque: false,
  },
  {
    id: 6,
    slug: "investimento-logistica",
    categoria: "Logística",
    titulo:
      "Fabiano Zaffalon Investe em Logística para Ampliar Cobertura Regional",
    resumo:
      "Novos investimentos em frota e infraestrutura garantem mais agilidade, segurança e eficiência nas entregas em todo o RS.",
    conteudo: `A Fabiano Zaffalon anuncia novos investimentos em logística para ampliar sua cobertura regional e garantir um serviço ainda mais eficiente.

Com uma frota renovada e processos otimizados, seguimos firmes no compromisso de entregar com pontualidade, segurança e qualidade em todo o Rio Grande do Sul.`,
    capa: "/images/noticias/noticia-6/capa.jpg",
    fotos: ["/images/noticias/noticia-6/capa.jpg"],
    data: "2024-01-30",
    destaque: false,
  },
];

// Helper — retorna notícia por slug
export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.slug === slug);
}

// Helper — formata data para exibição
export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
