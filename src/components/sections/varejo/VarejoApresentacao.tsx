import Image from "next/image";

export function VarejoApresentacao() {
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
              Quando o varejo cresce,
              <br />a gente cresce junto.
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Há quase <strong className="font-semibold">30 anos</strong>, a
              Fabiano Zaffalon atua conectando marcas líderes no país ao varejo
              com eficiência, proximidade e compromisso. Com uma estrutura
              sólida,{" "}
              <strong className="font-semibold">
                mais de 7 mil pontos de venda atendidos
              </strong>{" "}
              e{" "}
              <strong className="font-semibold">
                um portfólio com milhares de produtos
              </strong>
              , desenvolvemos a capacidade de atender negócios de diferentes
              portes, sempre buscando{" "}
              <strong className="font-semibold">
                soluções alinhadas à realidade
              </strong>{" "}
              específica de cada cliente.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              Somos uma empresa especializada, atuando{" "}
              <strong className="font-semibold">
                exclusivamente na distribuição
              </strong>
              . Nosso foco está em{" "}
              <strong className="font-semibold">apoiar o crescimento</strong>{" "}
              dos nossos parceiros, oferecendo acesso a grandes marcas,
              atendimento qualificado, abastecimento eficiente e suporte
              comercial para que cada estabelecimento tenha melhores condições
              de competir, crescer e gerar resultados.
            </p>
          </div>

          {/* Foto + Stats — direita */}
          <div className="order-2 md:order-none overflow-hidden rounded-2xl">
            {/* Foto — proporção horizontal fiel ao Figma */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "2371/1158" }}
            >
              <Image
                src="/images/varejo/apresentacao-varejo.jpg"
                alt="Colaboradora Fabiano Zaffalon no estoque"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Barra azul com stats */}
            <div className="flex items-center justify-center gap-10 bg-[#006EB7] px-6 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/icons/icon-entregas.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-12 w-12 shrink-0 brightness-0 invert"
                />
                <div>
                  <p className="text-lg font-black text-white leading-tight">
                    +7 mil
                  </p>
                  <p className="text-xs font-normal leading-tight text-white/80">
                    pontos de vendas
                    <br />
                    atendidos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/icons/icon-desde.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-12 w-12 shrink-0 brightness-0 invert"
                />
                <div>
                  <p className="text-lg font-black text-white leading-tight">
                    30 anos
                  </p>
                  <p className="text-xs font-normal leading-tight text-white/80">
                    de compromisso
                    <br />
                    com o varejo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
