import Image from "next/image";

export function VarejoPortfolio() {
  return (
    <section className="bg-[#EFEFEF] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">

          {/* Texto — esquerda */}
          <div className="flex flex-col gap-4">
            {/* Label laranja */}
            <p className="text-xs font-bold uppercase tracking-widest text-[#F47920]">
              Portfólio de Produtos
            </p>
            <h2
              className="font-black leading-tight text-[#006EB7]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Um portfólio forte faz toda a diferença no desempenho do varejo.
            </h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Por isso, trabalhamos com marcas reconhecidas nacionalmente, reunindo mais de{" "}
              <strong className="font-semibold text-[#595959]">4 mil produtos</strong> capazes de
              atender diferentes perfis de consumidores e categorias de negócio. Essa diversidade
              permite ampliar oportunidades de venda, fortalecer a presença no mercado e oferecer
              aos clientes finais a confiança que apenas marcas consolidadas conseguem transmitir.
            </p>
          </div>

          {/* Foto produtos — direita */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[380px]">
            <Image
              src="/images/varejo/portfolio-produtos.jpg"
              alt="Portfólio de produtos Fabiano Zaffalon"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
