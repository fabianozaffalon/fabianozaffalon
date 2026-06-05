// src/data/faq.ts
// Fonte única das perguntas e respostas do FAQ.
// Estático por design — não requer banco de dados.

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const FAQ_DATA: FaqCategory[] = [
  {
    id: "distribuicao",
    label: "Distribuição",
    items: [
      {
        id: 1,
        question: "O que faz uma distribuidora de alimentos?",
        answer:
          "Uma distribuidora conecta indústrias e marcas aos pontos de venda, garantindo que os produtos cheguem aos clientes com eficiência, regularidade e segurança.",
      },
      {
        id: 2,
        question: "O que é capilaridade de distribuição?",
        answer:
          "É a capacidade de uma empresa atender diferentes regiões e pontos de venda espalhados por aglomerações urbanas e rurais com eficiência e frequência.",
      },
      {
        id: 3,
        question: "Como a logística impacta as vendas de um produto?",
        answer:
          "Uma logística eficiente garante disponibilidade de estoque, reduz atrasos e melhora a presença da marca nos pontos de venda.",
      },
      {
        id: 4,
        question: "Qual a diferença entre indústria, distribuidora e varejo?",
        answer:
          "A indústria produz. A distribuidora conecta e abastece os canais de venda. O varejo comercializa os produtos para o consumidor final.",
      },
      {
        id: 5,
        question: "Por que a distribuição é importante para a indústria?",
        answer:
          "Ela amplia o alcance das marcas, fortalece a presença nos canais de venda e facilita o acesso aos mercados regionais.",
      },
      {
        id: 18,
        question: "Por que a confiança é importante na cadeia de abastecimento?",
        answer:
          "Porque garante previsibilidade, segurança e melhores relações comerciais entre todos os envolvidos.",
      },
      {
        id: 19,
        question: "Como uma distribuidora ajuda no crescimento de uma marca?",
        answer:
          "Ampliando sua presença nos pontos de venda e fortalecendo sua disponibilidade para os consumidores.",
      },
      {
        id: 20,
        question: "O que diferencia uma distribuidora especializada?",
        answer:
          "O foco em fortalecer o varejo, não competir com ele. A distribuidora especializada conecta indústria e varejo. Não comercializa para o consumidor final.",
      },
    ],
  },
  {
    id: "varejo",
    label: "Varejo",
    items: [
      {
        id: 6,
        question: "Como melhorar o abastecimento de um supermercado?",
        answer:
          "Contar com fornecedores confiáveis, planejar compras e trabalhar com uma distribuidora que mantenha frequência e regularidade nas entregas.",
      },
      {
        id: 7,
        question: "O que é gestão de mix de produtos?",
        answer:
          "É o processo de selecionar os produtos mais adequados para atender às necessidades do público e melhorar os resultados da loja.",
      },
      {
        id: 8,
        question: "Como aumentar as vendas no varejo alimentício?",
        answer:
          "Investindo em abastecimento, exposição adequada, promoções e um portfólio equilibrado de produtos.",
      },
      {
        id: 9,
        question: "Qual a importância das grandes marcas no varejo?",
        answer:
          "Elas geram confiança para o consumidor e contribuem para aumentar a rotatividade dos produtos.",
      },
      {
        id: 10,
        question: "O que influencia a decisão de compra do consumidor?",
        answer:
          "Preço, qualidade, disponibilidade, exposição e reconhecimento da marca.",
      },
      {
        id: 11,
        question: "Como escolher os produtos certos para o meu negócio?",
        answer:
          "É importante analisar o perfil dos clientes, histórico de vendas e tendências do mercado.",
      },
    ],
  },
  {
    id: "exposicao",
    label: "Exposição",
    items: [
      {
        id: 12,
        question: "Por que a exposição de produtos influencia as vendas?",
        answer:
          "Produtos bem posicionados são mais facilmente percebidos pelos consumidores e tendem a vender mais.",
      },
      {
        id: 13,
        question: "Como destacar lançamentos dentro da loja?",
        answer:
          "Utilizando pontos extras, materiais promocionais e posições de maior circulação.",
      },
      {
        id: 14,
        question: "Como melhorar a exposição dos produtos na loja?",
        answer:
          "Organizando categorias, destacando produtos estratégicos e mantendo os espaços abastecidos.",
      },
    ],
  },
  {
    id: "foodservice",
    label: "Food Service",
    items: [
      {
        id: 15,
        question: "O que é o segmento food service?",
        answer:
          "É o conjunto de empresas que produzem e servem alimentos para consumo fora do ambiente doméstico.",
      },
      {
        id: 16,
        question: "Como escolher fornecedores para restaurantes?",
        answer:
          "Buscando parceiros que ofereçam qualidade, regularidade de abastecimento e condições comerciais adequadas.",
      },
      {
        id: 17,
        question: "Por que o abastecimento é tão importante no food service?",
        answer:
          "Porque a falta de produtos pode comprometer o atendimento e gerar perda de vendas.",
      },
    ],
  },
];
