import Link from "next/link";

export function CtaBanner() {
  return (
    <section id="cta" className="bg-[#EFEFEF] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[28px] bg-[#006EB7] px-8 py-10 md:rounded-[40px] md:px-14 md:py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12">

            {/* Título — 2 linhas fixas via <br /> como no Figma */}
            <h2
              className="w-full text-left font-black text-white"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.2 }}
            >
              Conte com a gente para <br />
              conquistar o seu espaço.
            </h2>

            {/* Botões — 277x53px exatos no desktop, flex-1 no mobile */}
            <div className="flex w-full shrink-0 flex-row gap-3 md:w-auto">
              <Link
                href="#contato"
                className="
                  flex flex-1 items-center justify-center
                  rounded-[8px] bg-white
                  text-sm font-semibold text-[#006EB7]
                  transition-colors hover:bg-[#005a96] hover:text-white
                  h-[53px] md:w-[277px] md:flex-none
                "
              >
                Quero Comprar
              </Link>
              <Link
                href="#contato"
                className="
                  flex flex-1 items-center justify-center
                  rounded-[8px] border-2 border-white
                  text-sm font-semibold text-white
                  transition-colors hover:bg-white hover:text-[#006EB7]
                  h-[53px] md:w-[277px] md:flex-none
                "
              >
                Quero Representação
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
