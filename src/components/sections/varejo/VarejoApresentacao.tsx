import Image from "next/image";

export function VarejoApresentacao() {
  return (
    <section className="bg-[#EFEFEF] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">

          {/* Texto — esquerda */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Quando o varejo cresce,
              <br />
              a gente cresce junto.
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Há quase <strong className="font-semibold text-[#595959]">30 anos</strong>, a Fabiano Zaffalon atua conectando marcas
              líderes no país ao varejo com eficiência, proximidade e compromisso.
              Com uma estrutura sólida,{" "}
              <strong className="font-semibold text-[#595959]">mais de 7 mil pontos de venda atendidos</strong> e{" "}
              <strong className="font-semibold text-[#595959]">um portfólio com milhares de produtos</strong>, desenvolvemos a
              capacidade de atender negócios de diferentes portes, sempre
              buscando{" "}
              <strong className="font-semibold text-[#595959]">soluções alinhadas à realidade</strong> específica de cada cliente.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              Somos uma empresa especializada, atuando{" "}
              <strong className="font-semibold text-[#595959]">exclusivamente na distribuição</strong>. Nosso foco está em{" "}
              <strong className="font-semibold text-[#595959]">apoiar o crescimento</strong> dos nossos
              parceiros, oferecendo acesso a grandes marcas, atendimento
              qualificado, abastecimento eficiente e suporte comercial para que
              cada estabelecimento tenha melhores condições de competir, crescer
              e gerar resultados.
            </p>
          </div>

          {/* Foto + Stats — direita */}
          <div className="relative overflow-hidden rounded-2xl">
            {/* Foto */}
            <div className="relative h-[340px] w-full md:h-[420px]">
              <Image
                src="/images/varejo/apresentacao-varejo.jpg"
                alt="Colaboradora Fabiano Zaffalon no estoque"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Stats — barra azul no rodapé da foto */}
            <div className="grid grid-cols-2 bg-[#006EB7]">
              <div className="flex items-center gap-3 px-5 py-4 border-r border-white/20">
                <Image
                  src="/images/icons/icon-entregas.svg"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 brightness-0 invert"
                />
                <div>
                  <p className="text-base font-black text-white">+7 mil</p>
                  <p className="text-xs font-normal text-white/80 leading-tight">
                    pontos de vendas<br />atendidos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4">
                <Image
                  src="/images/icons/icon-calendario.svg"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 brightness-0 invert"
                />
                <div>
                  <p className="text-base font-black text-white">30 anos</p>
                  <p className="text-xs font-normal text-white/80 leading-tight">
                    de compromisso<br />com o varejo
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
