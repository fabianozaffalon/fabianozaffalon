import Image from "next/image";

const BENEFICIOS = [
  {
    icon: "/images/icons/icon-rotas-azul.svg",
    label: "Rotas de distribuição programadas",
  },
  {
    icon: "/images/icons/icon-abastecimento.svg",
    label: "Abastecimento confiável",
  },
  {
    icon: "/images/icons/icon-marcas.svg",
    label: "Marcas líderes em seus segmento",
  },
  {
    icon: "/images/icons/icon-mix-diversificado.svg",
    label: "Mix diversificado",
  },
  { icon: "/images/icons/icon-negociacao.svg", label: "Negociação justa" },
  {
    icon: "/images/icons/icon-atendimento-personalizado.svg",
    label: "Atendimento personalizado",
  },
  { icon: "/images/icons/icon-suporte.svg", label: "Suporte comercial" },
];

export function FoodServiceBeneficios() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2
          className="mb-10 px-5 text-center font-bold text-[#00497F] md:px-12"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Benefícios
        </h2>

        {/* Mobile: carrossel | Desktop: linha única */}
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-4 md:grid md:overflow-visible md:pb-0 md:px-12"
          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {BENEFICIOS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 text-center shrink-0 snap-start w-[120px] md:w-auto"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={56}
                height={56}
                className="h-20 w-20"
              />
              <p className="text-sm font-bold leading-snug text-[#006EB7]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Indicador swipe — só mobile */}
        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span className="text-xs text-gray-500">Deslize para ver mais</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
