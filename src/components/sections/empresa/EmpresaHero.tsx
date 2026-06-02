import Image from "next/image";
import Link from "next/link";

export function EmpresaHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#EFEFEF]" style={{ minHeight: "clamp(320px, 40vw, 520px)" }}>
      {/* Imagem do caminhão — direita */}
      {/* Salvar como: /public/images/empresa/hero-caminhao.jpg */}
      <div className="absolute inset-0">
        <Image
          src="/images/empresa/hero-caminhao.jpg"
          alt="Caminhão Fabiano Zaffalon em estrada"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay gradiente — texto legível à esquerda */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFEFEF] via-[#EFEFEF]/80 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="flex flex-col justify-center" style={{ minHeight: "clamp(320px, 40vw, 520px)" }}>

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-[#595959]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#006EB7] transition-colors">HOME</Link>
            <span className="text-[#BCBABA]">›</span>
            <span className="text-[#006EB7]">A EMPRESA</span>
          </nav>

          {/* Título */}
          <h1
            className="font-black leading-tight text-[#006EB7]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Movidos
            <br />
            pelos desafios
          </h1>
        </div>
      </div>
    </section>
  );
}
