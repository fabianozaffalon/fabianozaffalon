import Image from "next/image";

export function BrokerRede() {
  return (
    <section className="w-full">
      {/* Imagem fullwidth */}
      <div className="relative w-full" style={{ minHeight: "clamp(300px, 40vw, 560px)" }}>
        <Image
          src="/images/broker/rede-broker.jpg"
          alt="Rede de Atendimento Broker Fabiano Zaffalon Nestlé"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Texto sobreposto à direita */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
            <div className="ml-auto max-w-[520px] flex flex-col gap-5">
              <h2
                className="font-black leading-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Rede de atendimento
              </h2>
              <div className="rounded-full bg-white" style={{ width: "77px", height: "6px" }} />
              <p className="text-sm leading-relaxed text-white/90 md:text-base">
                Ao longo de quase 30 anos de atuação, construímos uma rede com mais de
                7 mil pontos de venda no Rio Grande do Sul, formada por empreendedores
                de diferentes portes e segmentos. Essa proximidade com o mercado nos
                permite desenvolver um trabalho consistente de distribuição,
                abastecimento e fortalecimento de marcas, conectando a Nestlé ao varejo
                e food service por meio de relacionamentos construídos com confiança,
                entendimento das necessidades locais e compromisso com resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
