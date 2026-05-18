import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-6 py-6 md:rounded-[40px] md:px-10 md:py-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">

            {/* ── Coluna esquerda: ~45% — label + foto proporção 4:3 ── */}
            <div className="flex flex-col gap-2 md:w-[45%] md:shrink-0">
              <p className="text-base font-bold text-white md:text-lg">
                Destaque do mês
              </p>
              {/*
                aspect-[4/3] garante proporção igual ao modelo (mais quadrada).
                A largura segue o container; a altura é calculada automaticamente.
              */}
              <div className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cta/destaque.png"
                  alt="Destaque do mês"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>

            {/* ── Coluna direita: ~55% — título + subtítulo + botões ── */}
            <div className="flex flex-1 flex-col gap-5">

              {/* Título + subtítulo */}
              <div className="flex flex-col gap-2">
                <h2
                  className="font-black text-white"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.1 }}
                >
                  Conte com a gente
                  <br />para conquistar
                  <br />o seu espaço.
                </h2>
                <p className="text-sm leading-snug text-white/85 md:text-base">
                  Temos sempre uma grande oportunidade para o seu negócio.
                  <br />
                  Chame o consultor da sua região e descubra.
                </p>
              </div>

              {/* Botões — lado a lado, bordas bem arredondadas como no modelo */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contato"
                  className="
                    flex h-[52px] flex-1 items-center justify-center
                    rounded-[10px] bg-white
                    text-sm font-semibold text-[#006EB7]
                    transition-colors hover:bg-[#005a96] hover:text-white
                  "
                >
                  Quero Comprar
                </Link>
                <Link
                  href="#contato"
                  className="
                    flex h-[52px] flex-1 items-center justify-center
                    rounded-[10px] border-2 border-white
                    text-sm font-semibold text-white
                    transition-colors hover:bg-white hover:text-[#006EB7]
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
