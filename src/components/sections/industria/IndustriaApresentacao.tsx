import Image from "next/image";

export function IndustriaApresentacao() {
  return (
    <section className="bg-[#EFEDED] pt-14 pb-8 md:pt-20 md:pb-10">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12">
          {/* Texto — esquerda */}
          <div className="flex flex-col gap-5 order-1 md:order-none">
            <h2
              className="font-bold leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Capilaridade, estrutura
              <br />e compromisso
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Construir presença de mercado exige muito mais do que colocar
              produtos em circulação. Requer estratégia, estrutura,
              relacionamento e capacidade de execução. Há quase 30 anos, a
              Fabiano Zaffalon atua conectando grandes marcas a milhares de
              pontos de venda no Rio Grande do Sul, desenvolvendo um trabalho
              baseado em confiança, compromisso e entendimento das necessidades
              da indústria.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              Mais do que uma operação de distribuição, oferecemos parceria.
              Trabalhamos apoiados em diretrizes fundamentais para o sucesso de
              marcas e produtos: uma estrutura sólida e uma cultura comprometida
              com resultados, uma logística eficiente e uma rede de atendimento
              ampla e consolidada. Entendemos os desafios da indústria porque
              assumimos cada objetivo dos nossos parceiros como parte do nosso
              próprio compromisso de crescimento.
            </p>
          </div>

          {/* Foto + Stats — direita */}
          <div className="order-2 md:order-none overflow-hidden rounded-2xl">
            <div
              className="relative w-full"
              style={{ aspectRatio: "2371/1158" }}
            >
              <Image
                src="/images/industria/apresentacao-industria.jpg"
                alt="Colaborador Fabiano Zaffalon no estoque"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Barra azul com 2 stats */}
            <div className="grid grid-cols-2 bg-[#006EB7] px-3 py-4 items-center md:px-4 md:py-0 md:h-[108px]">
              <div className="flex items-center justify-center gap-2 px-2 py-1 md:gap-3 md:px-4">
                <Image
                  src="/images/icons/icon-calendario.svg"
                  alt=""
                  aria-hidden="true"
                  width={86}
                  height={86}
                  className="h-10 w-10 shrink-0 brightness-0 invert md:h-[86px] md:w-[86px]"
                />
                <p className="text-sm font-light text-white leading-snug md:text-xl">
                  30 anos de
                  <br />
                  atuação
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 px-2 py-1 md:gap-3 md:px-4">
                <Image
                  src="/images/icons/icon-rs.svg"
                  alt=""
                  aria-hidden="true"
                  width={66}
                  height={66}
                  className="h-10 w-10 shrink-0 brightness-0 invert md:h-[66px] md:w-[66px]"
                />
                <p className="text-sm font-light text-white leading-snug md:text-xl">
                  Presente em
                  <br />
                  todo RS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
