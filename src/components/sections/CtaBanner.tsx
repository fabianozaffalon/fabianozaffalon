import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-6 py-6 md:rounded-[40px] md:px-8 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
            {/* ESQUERDA - imagem com proporção ORIGINAL, sem crop forçado */}
            <div className="md:w-[38%]">
              <p className="mb-2 text-base font-bold text-white md:text-lg">
                Destaque do mês
              </p>
              <div className="relative w-full overflow-hidden rounded-[16px]">
                {/* TIRA O aspect-ratio e TROCA object-cover por object-contain */}
                <Image
                  src="/images/cta/destaque.png"
                  alt="Destaque do mês"
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 38vw"
                  className="h-auto w-full"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* DIREITA - texto e botões */}
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2
                  className="font-black text-white"
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    lineHeight: 1.2,
                  }}
                >
                  Conte com a gente
                  <br />
                  para conquistar
                  <br />o seu espaço.
                </h2>
                <p className="text-sm leading-snug text-white/85 md:text-base">
                  Temos sempre uma grande oportunidade para o seu negócio.
                  <br />
                  Chame o consultor da sua região e descubra.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contato"
                  className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] bg-white text-sm font-semibold text-[#006EB7] transition-colors hover:bg-[#005a96] hover:text-white"
                >
                  Quero Comprar
                </Link>
                <Link
                  href="#contato"
                  className="flex h-[48px] flex-1 items-center justify-center rounded-[10px] border-2 border-white text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]"
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
