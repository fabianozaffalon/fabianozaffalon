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
  {
    id: "atendimento",
    label: "Atendimento",
    items: [
      {
        id: 21,
        question: "Como faço para me cadastrar e começar a comprar?",
        answer:
          "Você pode se cadastrar diretamente com um de nossos vendedores ou via WhatsApp de atendimento. É necessário ter um CNPJ ativo no ramo do comércio. Após o envio dos dados, nossa equipe valida o cadastro em até 48 horas úteis.",
      },
      {
        id: 22,
        question: "Vocês atendem pessoas físicas (CPF)?",
        answer:
          "Não. Nosso foco é exclusivamente o atendimento ao varejo B2B. Vendemos apenas para empresas com CNPJ ativo.",
      },
      {
        id: 23,
        question: "Existe um valor de pedido mínimo?",
        answer:
          "Sim. O valor mínimo para faturamento é de R$ 200,00 em mercadorias. Esse valor garante a sustentabilidade da operação logística e preços competitivos.",
      },
      {
        id: 24,
        question: "Como faço para reimprimir um boleto ou nota fiscal?",
        answer:
          "Você pode solicitar os documentos rapidamente ao nosso assistente no WhatsApp.",
      },
      {
        id: 25,
        question: "Como funciona o frete? O frete é gratuito?",
        answer:
          "Trabalhamos com o modelo CIF (frete por nossa conta) para todos os pedidos.",
      },
      {
        id: 26,
        question: "Posso retirar o meu pedido diretamente no centro de distribuição?",
        answer:
          "Não. Não são permitidas retiradas de pedidos em nossos CDs.",
      },
      {
        id: 27,
        question: "Como funciona a liberação de prazo no boleto (boleto faturado)?",
        answer:
          "A liberação de crédito a prazo está sujeita a análise. O prazo padrão concedido após aprovação é de 28 dias.",
      },
      {
        id: 28,
        question: "Meu CNPJ é novo. Consigo comprar a prazo?",
        answer:
          "Para CNPJs com menos de 6 meses de abertura, as primeiras compras devem ser feitas via depósito antecipado. A análise de crédito a prazo pode ser solicitada após esse período.",
      },
      {
        id: 29,
        question: "Recebi um produto quebrado ou violado. O que devo fazer?",
        answer:
          "Recuse a mercadoria no ato da entrega e escreva o motivo no verso da Nota Fiscal (Danfe).",
      },
      {
        id: 30,
        question: "Posso trocar um produto que não está vendendo por outro?",
        answer:
          "Não realizamos trocas por falta de giro de estoque do lojista. Trocamos apenas produtos com defeito de fabricação ou avarias de transporte.",
      },
      {
        id: 31,
        question: "Como faço para receber a visita de um representante comercial?",
        answer:
          "Você pode solicitar uma visita ligando para a nossa central ou preenchendo o formulário de contato no site. Informaremos o representante responsável pela sua região.",
      },
      {
        id: 32,
        question: "Vocês oferecem material de ponto de venda (PDV) ou displays?",
        answer:
          "Sim. Possuímos materiais de merchandising de diversas marcas parceiras. Comunique o seu vendedor para verificar a disponibilidade de displays e cartazes para a sua loja.",
      },
    ],
  },
];
