import Image from "next/image";

export function FoodServiceApresentacao() {
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
              A base de uma operação
              <br />
              que não pode parar
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              No segmento de food service, confiança não é um diferencial: é uma
              necessidade. Restaurantes, padarias, confeitarias, hotéis,
              cozinhas industriais e diversos outros negócios dependem de
              abastecimento constante para manter a qualidade do atendimento e a
              satisfação dos seus clientes. Por isso, contar com um parceiro
              sério, estruturado e comprometido faz toda a diferença na rotina
              da operação.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              A Fabiano Zaffalon trabalha para garantir segurança,
              previsibilidade e eficiência na distribuição. Com um portfólio
              formado por marcas prestigiadas e desejadas no mercado, condições
              comerciais justas e uma operação preparada para atender as
              demandas do setor, oferecemos aos nossos parceiros a tranquilidade
              de saber que podem contar com um fornecedor presente e alinhado ao
              ritmo que o seu negócio exige.
            </p>
          </div>

          {/* Foto + Stats — direita */}
          <div className="order-2 md:order-none overflow-hidden rounded-2xl">
            {/* Foto */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "2371/1158" }}
            >
              <Image
                src="/images/foodservice/apresentacao-foodservice.jpg"
                alt="Caminhão Fabiano Zaffalon sendo descarregado"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Barra azul — ícone esquerda, texto direita */}
            <div className="grid grid-cols-2 bg-[#006EB7] px-4 py-5 items-center">
              {/* Stat 1 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <Image
                  src="/images/icons/icon-abastecimento.svg"
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 brightness-0 invert"
                />
                <p className="text-lg font-light text-white leading-snug">
                  Segurança
                  <br />
                  na entrega
                </p>
              </div>
              {/* Stat 2 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <Image
                  src="/images/icons/icon-atendimento.svg"
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 brightness-0 invert"
                />
                <p className="text-lg font-light text-white leading-snug">
                  Atendimento
                  <br />
                  especializado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
