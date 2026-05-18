// CtaBanner.tsx - versão ajustada
import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="relative overflow-hidden rounded-[28px] bg-[#006EB7] md:rounded-[40px]">
          <div className="flex flex-col md:flex-row">
            {/* IMAGEM - lado esquerdo com proporção correta */}
            <div className="relative md:w-[40%]">
              {/* A imagem ocupa 100% da altura do card */}
              <div className="relative h-full min-h-[280px] w-full md:absolute md:h-full">
                <Image
                  src="/images/cta/destaque.png"
                  alt="Destaque do mês"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Label "Destaque do mês" sobreposta na imagem (estilo Figma) */}
              <div className="absolute left-4 top-4 z-10 md:left-6 md:top-6">
                <p className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm md:text-sm">
                  Destaque do mês
                </p>
              </div>
            </div>

            {/* TEXTO E BOTÕES - lado direito */}
            <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-10 md:py-12">
              {/* Título principal (copiado do Figma) */}
              <div className="mb-4">
                <h2
                  className="mb-2 font-black text-white"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Conte com a gente
                  <br />
                  para conquistar
                  <br />o seu espaço.
                </h2>

                {/* Subtítulo com ícone ou destaque (sugestão baseada no modelo) */}
                <p className="mt-3 text-sm text-white/80 md:text-base">
                  <span className="font-semibold text-white">
                    Temos sempre uma grande oportunidade
                  </span>
                  <br />
                  para o seu negócio. Chame o consultor da sua região e
                  descubra.
                </p>
              </div>

              {/* Botões lado a lado */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contato"
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-white text-sm font-bold text-[#006EB7] transition-all hover:bg-[#005a96] hover:text-white md:h-14 md:text-base"
                >
                  Quero Comprar
                </Link>
                <Link
                  href="#contato"
                  className="flex h-12 flex-1 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white transition-all hover:bg-white hover:text-[#006EB7] md:h-14 md:text-base"
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
