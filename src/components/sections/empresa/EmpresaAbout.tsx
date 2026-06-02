import Image from "next/image";

const STATS = [
  {
    icon: "/images/icons/icon-entregas.svg",
    value: "+70 mil",
    label: "entregas por ano",
  },
  {
    icon: "/images/icons/icon-colaboradores.svg",
    value: "300",
    label: "colaboradores",
  },
  {
    icon: "/images/icons/icon-unidades.svg",
    value: "2 Unidade",
    label: "Pelotas e Rio Pardo",
  },
  {
    icon: "/images/icons/icon-desde.svg",
    value: "Desde",
    label: "1997",
    labelBold: true,
  },
];

export function EmpresaAbout() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 md:items-start">

          {/* Texto institucional — esquerda */}
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed text-[#595959]">
              Um empreendimento geralmente nasce de um sonho, mas não prospera apenas baseado em
              idealização. <strong className="font-semibold">Desde os primeiros passos de nossa trajetória, em 1997,</strong> o
              compromisso foi enraizado na rotina de cada dia. Compromisso absoluto com todos os
              nossos parceiros, com as relações de confiança que construímos e com os desafios que
              nos propomos a enfrentar.
            </p>
            <p className="text-sm leading-relaxed text-[#595959]">
              A partir do estabelecimento de uma estrutura consistente, conquistamos a capacidade de
              realizar mais de <strong className="font-semibold">70 mil entregas por ano</strong> e contamos com cerca de{" "}
              <strong className="font-semibold">300 colaboradores</strong> nas{" "}
              <strong className="font-semibold">unidades de Pelotas e Rio Pardo.</strong> Estamos presentes no pequeno, médio e
              grande varejo, no segmento de food service e na indústria. Temos orgulho de distribuir
              produtos de marcas de prestígio nacional e oferecer soluções alinhadas às necessidades
              específicas de cada negócio. Ainda assim, sabemos que sempre há espaço para evoluir.
              Afinal, somos movidos pelos desafios.
            </p>
          </div>

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <div>
                  <p
                    className="font-black text-[#006EB7]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className={
                    "text-sm text-[#595959] " +
                    (stat.labelBold ? "font-black text-[#006EB7] text-2xl" : "font-normal")
                  }>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
