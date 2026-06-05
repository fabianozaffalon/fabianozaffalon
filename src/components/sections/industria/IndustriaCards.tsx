import Image from "next/image";

const CARDS = [
  {
    id: "estrutura",
    icon: "/images/icons/icon-estrutura.svg",
    titulo: "Estrutura e cultura",
    texto:
      "Contamos com uma estrutura interna robusta, preparada para atender as demandas de um mercado dinâmico e competitivo. Além de processos e operação, cultivamos uma cultura baseada em comprometimento, proximidade e responsabilidade com os resultados dos nossos parceiros. Entender os desafios da indústria, suas metas e oportunidades faz parte da nossa forma de atuar. Acreditamos que o crescimento acontece quando os objetivos e desafios são compartilhados.",
    imagem: "/images/industria/estrutura-cultura.jpg",
    alt: "Sede Fabiano Zaffalon — Estrutura e Cultura",
  },
  {
    id: "logistica",
    icon: "/images/icons/icon-logistica.svg",
    titulo: "Logística",
    texto:
      "Nossa operação logística foi desenvolvida para garantir eficiência, capilaridade e abastecimento contínuo. Com uma rede preparada para atender desde o varejo local até grandes redes, conseguimos levar produtos e marcas a milhares de pontos de venda em solo gaúcho, oferecendo à indústria os canais de escoamento necessários para ampliar presença, fortalecer posicionamento e gerar resultados consistentes.",
    imagem: "/images/industria/logistica.jpg",
    alt: "Caminhão Fabiano Zaffalon — Logística",
  },
  {
    id: "rede",
    icon: "/images/icons/icon-rede.svg",
    titulo: "Rede de atendimento",
    texto:
      "Ao longo de quase 30 anos de atuação, construímos uma rede com mais de 7 mil pontos de venda no Rio Grande do Sul, formada por empreendedores de diferentes portes e segmentos. Essa proximidade com o mercado nos permite gerar conexões estratégicas entre indústria e varejo, fortalecendo marcas por meio de relacionamento, profundo conhecimento regional e uma atuação comercial comprometida com o desenvolvimento de toda a cadeia.",
    imagem: "/images/industria/rede-atendimento.jpg",
    alt: "Parceria Fabiano Zaffalon — Rede de Atendimento",
  },
];

export function IndustriaCards() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="flex flex-col gap-6">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="grid grid-cols-1 overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm md:grid-cols-[1fr_auto]"
            >
              {/* Conteúdo — esquerda */}
              <div className="flex flex-col gap-4 p-8 md:p-10">
                {/* Ícone circular azul */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#006EB7]">
                  <Image
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    width={36}
                    height={36}
                    className="h-9 w-9 brightness-0 invert"
                  />
                </div>
                <h2
                  className="font-black text-[#006EB7]"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                >
                  {card.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-[#595959]">
                  {card.texto}
                </p>
              </div>

              {/* Foto — direita */}
              <div className="relative hidden md:block w-[340px] lg:w-[400px]">
                <Image
                  src={card.imagem}
                  alt={card.alt}
                  fill
                  className="object-cover object-center"
                  sizes="400px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
