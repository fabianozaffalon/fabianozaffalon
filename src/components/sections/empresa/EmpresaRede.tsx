import Image from "next/image";

export function EmpresaRede() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(360px, 40vw, 500px)" }}>
      {/* Foto de fundo — /public/images/empresa/rede-atendimento.jpg */}
      <Image
        src="/images/empresa/rede-atendimento.jpg"
        alt="Equipe Fabiano Zaffalon — Rede de Atendimento"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay azul escuro — lado direito com texto */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#00497F]/95 via-[#00497F]/80 to-transparent" />

      {/* Conteúdo — alinhado à direita */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex items-center justify-end"
          style={{ minHeight: "clamp(360px, 40vw, 500px)" }}
        >
          <div className="w-full max-w-[520px]">
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Rede de atendimento
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/85 md:text-base">
              Ao longo de quase 30 anos de história, construímos algo que transcende a operação de
              distribuição. Construímos sobretudo relações. Foi por meio da parceria, do entendimento
              das necessidades de cada cliente e do compromisso assumido cotidianamente que
              desenvolvemos uma rede com mais de{" "}
              <strong className="font-semibold text-white">7 mil pontos de venda no Rio Grande do Sul,</strong>{" "}
              conectando marcas, oportunidades e negócios de diferentes segmentos do varejo e food
              service. Essa rede é formada por empreendedores de todos os portes que encontram na
              Fabiano Zaffalon um parceiro próximo e comprometido com o seu crescimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
