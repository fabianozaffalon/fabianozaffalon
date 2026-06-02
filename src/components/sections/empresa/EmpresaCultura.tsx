import Image from "next/image";

const CULTURA = [
  {
    icon: "/images/icons/icon-missao.svg",
    titulo: "Missão",
    texto:
      "Conectar grandes marcas ao mercado por meio de uma operação eficiente, confiável e comprometida com resultados. Trabalhar diariamente para oferecer soluções que contribuam para o crescimento de clientes, parceiros e colaboradores, fortalecendo relações construídas com responsabilidade, proximidade e excelência em cada etapa do processo.",
  },
  {
    icon: "/images/icons/icon-visao.svg",
    titulo: "Visão",
    texto:
      "Ser reconhecida como uma das principais distribuidoras do Sul do Brasil, referência em qualidade operacional, desenvolvimento de pessoas e geração de valor para toda a cadeia de negócios atendidos. Crescer de forma sustentável, ampliando oportunidades e fortalecendo parcerias que impulsionam o desenvolvimento conjunto.",
  },
  {
    icon: "/images/icons/icon-valores.svg",
    titulo: "Valores",
    texto:
      "Compromisso com as pessoas, respeito às relações de confiança, ética nas decisões, excelência na execução e busca constante por evolução. Valorizamos o trabalho em equipe, a responsabilidade com nossos parceiros e a capacidade de transformar desafios em oportunidades de crescimento, mantendo sempre o foco na qualidade e nos resultados.",
  },
];

export function EmpresaCultura() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

        {/* Título */}
        <h2
          className="mb-10 text-center font-semibold text-[#595959]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Nossa Cultura
        </h2>

        {/* Cards — 3 colunas desktop, empilhados mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CULTURA.map((item) => (
            <div
              key={item.titulo}
              className="relative overflow-hidden rounded-[12px] border-t-4 border-[#006EB7] bg-white p-6 shadow-sm"
            >
              {/* Grid pattern de fundo */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <Image
                  src="/images/ui/grid-pattern.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10">
                {/* Ícone + Título */}
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src={item.icon}
                    alt={item.titulo}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0"
                  />
                  <h3 className="text-lg font-bold text-[#006EB7]">
                    {item.titulo}
                  </h3>
                </div>

                {/* Divisor sutil */}
                <div className="mb-4 h-px w-full bg-gray-100" />

                {/* Texto */}
                <p className="text-sm leading-relaxed text-[#595959]">
                  {item.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
