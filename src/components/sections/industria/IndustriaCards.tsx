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
        <div className="flex flex-col gap-8">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="relative flex items-center rounded-[20px] bg-[#E5E3EB]"
              style={{ minHeight: "269px" }}
            >
              {/* Ícone circular — grande, sai do card à esquerda */}
              <div className="absolute -left-8 flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#006EB7] shadow-lg md:-left-10 md:h-32 md:w-32">
                <Image
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className={`${
                    card.id === "rede" ? "h-20 w-20" : "h-16 w-16"
                  } brightness-0 invert`}
                />
              </div>

              {/* Texto — centro, margem ajustada para bola maior */}
              <div className="flex flex-1 flex-col gap-3 py-8 pl-28 pr-6 md:pl-32 md:pr-8">
                <h2
                  className="font-bold text-[#006EB7]"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                >
                  {card.titulo}
                </h2>
                <p className="text-sm leading-relaxed text-[#595959]">
                  {card.texto}
                </p>
              </div>

              {/* Foto — direita, 4 cantos arredondados com margem interna */}
              <div
                className="relative hidden shrink-0 self-stretch md:flex md:items-stretch"
                style={{ width: "44%", padding: "12px 12px 12px 0" }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[16px]"
                  style={{ minHeight: "245px" }}
                >
                  <Image
                    src={card.imagem}
                    alt={card.alt}
                    fill
                    className="object-cover object-center"
                    sizes="44vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
