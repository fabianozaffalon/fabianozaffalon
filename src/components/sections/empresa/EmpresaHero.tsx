import Image from "next/image";
import Link from "next/link";

export function EmpresaHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#EFEFEF]"
      style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
    >
      {/* Imagem do caminhão */}
      <div className="absolute inset-0">
        <Image
          src="/images/empresa/hero-caminhao.jpg"
          alt="Caminhão Fabiano Zaffalon em estrada"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay — mais forte à esquerda para o texto ser legível */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFEFEF]/95 via-[#EFEFEF]/70 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
        >
          {/* Breadcrumb — branco, HOME sublinhado e clicável */}
          <nav
            className="mb-5 flex items-center gap-2 text-xs font-medium text-[#595959]"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="underline underline-offset-2 hover:text-[#006EB7] transition-colors"
            >
              HOME
            </Link>
            <span className="text-[#BCBABA]">›</span>
            <span className="text-[#006EB7] font-semibold">A EMPRESA</span>
          </nav>

          {/* Título — proporcional ao Figma */}
          <h1
            className="font-black leading-[1.1] text-[#006EB7]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
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
