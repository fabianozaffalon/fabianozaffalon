
export function CtaBannerSimples() {
  return (
    <section className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-8 py-10 md:rounded-[40px] md:px-14 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            {/* Texto — esquerda */}
            <div className="flex flex-col gap-2">
              <h2
                className="font-bold leading-tight text-white"
                style={{ fontSize: "clamp(1.35rem, 2.8vw, 2rem)" }}
              >
                Conte com a gente para
                <br />
                conquistar o seu espaço.
              </h2>
              <p className="text-sm font-normal text-white/95">
                Temos sempre uma grande oportunidade para o seu negócio.
                <br className="hidden sm:block" />
                Chame o consultor da sua região e descubra.
              </p>
            </div>

            {/* Botões — direita */}
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:shrink-0">
              <a
                href="https://wa.me/555332734110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-[8px] bg-white px-8 py-3.5 text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#005a96] hover:text-white h-[53px] md:w-[220px] whitespace-nowrap"
              >
                Quero Comprar
              </a>

              <a
                href="https://wa.me/555332734110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-[8px] border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7] h-[53px] md:w-[220px] whitespace-nowrap"
              >
                Quero Representação
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
