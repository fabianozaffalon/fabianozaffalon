import Image from "next/image";
import Link from "next/link";

export function VarejoHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
    >
      {/* Imagem de fundo */}
      <Image
        src="/images/varejo/hero-varejo.jpg"
        alt="Entrega Fabiano Zaffalon em supermercado"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay azul escuro */}
      <div className="absolute inset-0 bg-[#006EB7]/80" />

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
        >
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-xs font-medium text-white/80" aria-label="Breadcrumb">
            <Link href="/" className="underline underline-offset-2 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-white/50">›</span>
            <Link href="#solucoes" className="hover:text-white transition-colors">
              ATUAÇÃO
            </Link>
            <span className="text-white/50">›</span>
            <span className="text-white font-semibold">VAREJO</span>
          </nav>

          {/* Título */}
          <h1
            className="font-black leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            <span className="text-white">Varejista:</span>
            <br />
            <span className="font-normal">conte com um parceiro</span>
            <br />
            <span className="font-normal">que fortalece o</span>
            <br />
            <span className="font-normal">seu negócio.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
