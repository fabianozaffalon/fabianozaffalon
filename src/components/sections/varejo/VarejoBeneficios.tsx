import Image from "next/image";

const BENEFICIOS = [
  { icon: "/images/icons/icon-desde.svg",       label: "30 anos de compromisso com nossos parceiros" },
  { icon: "/images/icons/icon-negociacao.svg",  label: "Negociação justa" },
  { icon: "/images/icons/icon-marcas.svg",      label: "Marcas líderes em cada segmento" },
  { icon: "/images/icons/icon-rotas.svg",       label: "Rotas de distribuição programadas" },
  { icon: "/images/icons/icon-seguranca.svg",   label: "Segurança e confiabilidade nas entregas" },
  { icon: "/images/icons/icon-mix.svg",         label: "Apoio na seleção do mix" },
  { icon: "/images/icons/icon-parceiro.svg",    label: "Parceiro de verdade: não vendemos para o cliente local" },
];

export function VarejoBeneficios() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">

        {/* Título */}
        <h2
          className="mb-12 text-center font-black text-[#595959]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          Benefícios
        </h2>

        {/* Grid de ícones — 4 na primeira linha, 3 na segunda centralizados */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {BENEFICIOS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 text-center w-[120px] md:w-[130px]"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <p className="text-xs font-medium leading-snug text-[#006EB7]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
