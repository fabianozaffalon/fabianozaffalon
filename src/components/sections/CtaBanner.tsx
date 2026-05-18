import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-8 py-8 md:rounded-[40px] md:px-12 md:py-10">

          {/* Layout: imagem+label à esquerda | título+texto+botões à direita */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">

            {/* ── Coluna esquerda ── */}
            <div className="flex flex-col gap-2 md:w-[320px] md:shrink-0">
              <p className="text-sm font-semibold text-white">
                Destaque do mês
              </p>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px]">
                <Image
                  src="/images/cta/destaque.png"
                  alt="Destaque do mês"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            </div>

            {/* ── Coluna direita ── */}
            <div className="flex flex-1 flex-col gap-6">

              {/* Título + subtítulo */}
              <div className="flex flex-col gap-3">
                <h2
                  className="font-black text-white"
                  style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.1 }}
                >
                  Conte com a gente
                  <br />para conquistar
                  <br />o seu espaço.
                </h2>
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  Temos sempre uma grande oportunidade para o seu negócio.
                  <br />
                  Chame o consultor da sua região e descubra.
                </p>
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contato"
                  className="
                    flex h-[53px] flex-1 items-center justify-center
                    rounded-[8px] bg-white
                    text-sm font-semibold text-[#006EB7]
                    transition-colors hover:bg-[#005a96] hover:text-white
                    md:max-w-[240px]
                  "
                >
                  Quero Comprar
                </Link>
                <Link
                  href="#contato"
                  className="
                    flex h-[53px] flex-1 items-center justify-center
                    rounded-[8px] border-2 border-white
                    text-sm font-semibold text-white
                    transition-colors hover:bg-white hover:text-[#006EB7]
                    md:max-w-[240px]
                  "
                >
                  Quero Representação
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
