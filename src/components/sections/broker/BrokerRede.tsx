import Image from "next/image";

export function BrokerRede() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Mobile — imagem + bloco de texto separados ── */}
      <div className="md:hidden">
        <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
          <Image
            src="/images/broker/rede-broker-mobile.jpg"
            alt="Produtos Nestlé — Rede de Atendimento Broker Fabiano Zaffalon"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="bg-[#1A5C8C] px-5 py-10">
          <h2
            className="font-black leading-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)" }}
          >
            Rede de atendimento
          </h2>
          <div className="mt-3 mb-5 bg-white" style={{ width: "77px", height: "6px" }} />
          <p className="text-sm leading-relaxed text-white/90">
            Ao longo de quase 30 anos de atuação, construímos uma rede com
            mais de 7 mil pontos de venda no Rio Grande do Sul, formada por
            empreendedores de diferentes portes e segmentos. Essa
            proximidade com o mercado nos permite desenvolver um trabalho
            consistente de distribuição, abastecimento e fortalecimento de
            marcas, conectando a Nestlé ao varejo e food service por meio de
            relacionamentos construídos com confiança, entendimento das
            necessidades locais e compromisso com resultados.
          </p>
        </div>
      </div>

      {/* ── Desktop — imagem fullwidth com texto sobreposto ── */}
      <div className="hidden md:block">
        <Image
          src="/images/broker/rede-broker.jpg"
          alt="Rede de Atendimento Broker Fabiano Zaffalon Nestlé"
          width={1920}
          height={640}
          className="w-full h-auto"
          style={{ width: "100%", height: "auto" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
            <div className="ml-auto max-w-[520px] flex flex-col gap-5">
              <h2
                className="font-black leading-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Rede de atendimento
              </h2>
              <div className="bg-white" style={{ width: "77px", height: "6px" }} />
              <p className="text-sm leading-relaxed text-white/90 md:text-base">
                Ao longo de quase 30 anos de atuação, construímos uma rede com
                mais de 7 mil pontos de venda no Rio Grande do Sul, formada por
                empreendedores de diferentes portes e segmentos. Essa
                proximidade com o mercado nos permite desenvolver um trabalho
                consistente de distribuição, abastecimento e fortalecimento de
                marcas, conectando a Nestlé ao varejo e food service por meio de
                relacionamentos construídos com confiança, entendimento das
                necessidades locais e compromisso com resultados.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
