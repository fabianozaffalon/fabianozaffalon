import Image from "next/image";
import Link from "next/link";

export function ContatoHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(240px, 28vw, 340px)" }}
    >
      {/* Imagem já tem efeitos — sem overlay */}
      <Image
        src="/images/contato/hero-contato.jpg"
        alt="Sede Fabiano Zaffalon"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "clamp(240px, 28vw, 340px)" }}
        >
          <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="underline underline-offset-2 hover:text-white transition-colors">HOME</Link>
            <span className="text-white/40">›</span>
            <span className="text-white font-semibold">CONTATO</span>
          </nav>

          <h1
            className="font-black text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Contato
          </h1>
          <p className="mt-2 text-sm text-white/90">
            Entre em contato ou envie seu currículo.
            <br />Será um prazer conversar com você.
          </p>
        </div>
      </div>
    </section>
  );
}
