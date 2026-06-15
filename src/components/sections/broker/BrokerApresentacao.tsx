import Image from "next/image";

export function BrokerApresentacao() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          {/* Esquerda — texto */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)" }}
            >
              Ao lado da Nestlé, construindo
              <br />
              valor no mercado.
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              A trajetória da Broker Fabiano Zaffalon junto à Nestlé é resultado
              de uma parceria construída com trabalho, comprometimento e entrega
              de resultados. Nossa história teve início na representação de
              marcas da companhia, desenvolvendo um trabalho próximo ao mercado,
              fortalecendo relacionamentos e ampliando a presença dos produtos
              nos pontos de venda.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              O reconhecimento dessa trajetória se consolidou com a posição de
              Broker exclusivo da Nestlé em nossas áreas de atuação. Uma
              conquista que reflete não apenas a robustez da nossa estrutura e
              dos nossos processos, mas também a dedicação de nossa equipe
              comprometida em representar uma das maiores empresas de alimentos
              do mundo.
            </p>
          </div>

          {/* Direita — foto + badges */}
          <div className="flex flex-col gap-0">
            <div
              className="relative w-full overflow-hidden rounded-t-[16px]"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src="/images/broker/apresentacao-broker.jpg"
                alt="Estoque Broker Fabiano Zaffalon Nestlé"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Badges */}
            <div className="grid grid-cols-2 rounded-b-[16px] bg-[#00497F]">
              <div className="flex items-center gap-4 px-6 py-5">
                <Image
                  src="/images/icons/icon-broker.svg"
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={48}
                  className="h-14 w-14 shrink-0 brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-normal leading-none text-white/70">
                    Broker Exclusivo
                  </span>
                  <span className="text-2xl font-bold leading-none text-white">
                    Nestlé
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-5">
                <Image
                  src="/images/icons/icon-estrutura.svg"
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={48}
                  className="h-14 w-14 shrink-0 brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-normal leading-none text-white/70">
                    Parceria construída
                  </span>
                  <span className="text-lg font-bold leading-none text-white">
                    com confiança
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
