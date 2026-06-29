import Image from "next/image";
import Link from "next/link";

const SOLUTIONS = [
  {
    id: "varejo",
    title: "Varejo",
    description:
      "Estamos ao lado do pequeno, médio e grande varejo para que sejam sempre competitivos.",
    image: "/images/solutions/varejo.png",
    href: "/varejo",
  },
  {
    id: "food-service",
    title: "Food Service",
    description:
      "Quem faz da alimentação um negócio que transforma sabor em resultado precisa de um parceiro comprometido.",
    image: "/images/solutions/food-service.png",
    href: "/foodservice",
  },
  {
    id: "industria",
    title: "Indústria",
    description:
      "Estamos junto da indústria para transformar grandes produtos em líderes de mercado",
    image: "/images/solutions/industria.png",
    href: "/industria",
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1280px]">
        {/* Título */}
        <h2 className="mb-8 px-5 text-center text-xl font-semibold text-gray-600 md:mb-10 md:px-6 md:text-3xl">
          Nossas Soluções
        </h2>

        {/*
          Mobile: scroll horizontal com snap — o usuário desliza naturalmente.
          O padding lateral expõe a borda do próximo card, indicando que há mais.
          Desktop: grid de 3 colunas igual.
        */}
        <div
          className={[
            // Mobile — carrossel
            "flex gap-4 overflow-x-auto scroll-smooth",
            "snap-x snap-mandatory",
            "px-5 pb-5 scroll-pl-5", // padding + scroll-padding alinhados
            "scrollbar-hide",
            // Desktop — grid
            "md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-6 md:pb-0 md:scroll-pl-0",
          ].join(" ")}
        >
          {SOLUTIONS.map((item) => (
            <article
              key={item.id}
              className={[
                "group relative overflow-hidden rounded-xl",
                "shrink-0 snap-start",
                // Mobile: largura = 80% da tela (expõe ~20% do próximo)
                "w-[80vw]",
                // Desktop: largura automática pelo grid
                "md:w-auto",
              ].join(" ")}
            >
              {/* Imagem com proporção fixa */}
              <div className="relative w-full aspect-[3/4] md:aspect-[364/386]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 420px"
                />

                {/* Overlay gradiente */}

                {/* Conteúdo sobre a imagem */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-normal leading-relaxed text-white/95">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    aria-label={`Ver detalhes da solução para ${item.title}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white underline underline-offset-2 opacity-80 transition-opacity hover:opacity-100"
                  >
                    Saiba mais
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span className="text-xs text-gray-400">Deslize para ver mais</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>

        {/* Texto institucional */}
        <p className="mx-auto mt-10 max-w-[780px] px-5 text-center text-sm leading-relaxed text-gray-500 md:mt-14 md:px-6 md:text-base">
          Acreditamos que eficiência é conhecimento transformado em entregas
          rápidas, seguras e consistentes. Através de processos claros e cultura
          forte. Há 29 anos no mercado e com uma grande história de perseverança
          e conquistas, representando algumas das principais marcas do Brasil,
          sempre com resultados acima de suas próprias médias em outros
          mercados. Na Fabiano Zaffalon, assumimos o seu desafio como nosso.
        </p>
      </div>
    </section>
  );
}
