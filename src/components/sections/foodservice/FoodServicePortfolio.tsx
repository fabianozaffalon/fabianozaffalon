import Image from "next/image";

export function FoodServicePortfolio() {
  return (
    <section className="bg-[#E5E3EB] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] md:items-center gap-8 md:gap-10">
          {/* Texto — esquerda */}
          <div className="flex flex-col gap-4 order-1 md:order-none">
            <p className="text-sm font-bold uppercase tracking-widest text-[#0084E5]">
              Portfólio de Produtos
            </p>
            <h2
              className="font-bold leading-tight text-[#00497F]"
              style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)" }}
            >
              Qualidade que começa na escolha dos produtos
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              A qualidade percebida pelo cliente final começa na escolha dos
              ingredientes e produtos que fazem parte da operação.
              Disponibilizamos um portfólio composto por grandes marcas,
              reconhecidas pela sua consistência, desempenho e credibilidade no
              mercado. São milhares de itens que ajudam nossos parceiros a
              manter padrões de qualidade nas receitas, otimizar processos e
              oferecer experiências que fidelizam consumidores e fortalecem seus
              negócios.
            </p>
          </div>

          {/* Foto produtos — direita, sem overlay */}
          <div className="order-2 md:order-none w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/varejo/portfolio-produtos.png"
              alt="Portfólio de produtos Fabiano Zaffalon"
              width={715}
              height={292}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
