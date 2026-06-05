import Image from "next/image";
import Link from "next/link";

export function FaqHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(240px, 28vw, 360px)" }}
    >
      {/* Imagem de fundo — já tem efeitos próprios */}
      <Image
        src="/images/faq/hero-faq.jpg"
        alt="Estoque Fabiano Zaffalon"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "clamp(240px, 28vw, 360px)" }}
        >
          {/* Breadcrumb */}
          <nav
            className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="underline underline-offset-2 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-white/40">›</span>
            <span className="text-white font-semibold">FAQ</span>
          </nav>

          <h1 className="font-black text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            FAQ
          </h1>
          <p
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            Perguntas frequentes
          </p>
          <p className="mt-2 max-w-[420px] text-sm text-white/80">
            Tire suas dúvidas sobre distribuição, logística, varejo e nossas soluções.
          </p>
        </div>
      </div>
    </section>
  );
}
