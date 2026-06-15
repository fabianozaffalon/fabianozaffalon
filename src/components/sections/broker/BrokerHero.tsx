import Image from "next/image";
import Link from "next/link";

export function BrokerHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Imagem fullwidth */}
      <Image
        src="/images/broker/hero-broker.jpg"
        alt="Broker Nestlé — Fabiano Zaffalon"
        width={1440}
        height={480}
        className="w-full h-auto"
        sizes="100vw"
        priority
      />

      {/* Texto sobreposto à esquerda */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
          <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-[#00497F]">
            <Link
              href="/"
              className="underline underline-offset-2 hover:text-[#006EB7] transition-colors"
            >
              HOME
            </Link>
            <span className="text-[#00497F]">›</span>
            <span className="text-[#00497F] font-semibold">BROKER NESTLÉ</span>
          </nav>
          <h1
            className="font-black leading-tight text-[#00497F]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Broker Nestlé:
          </h1>
          <h2
            className="font-bold leading-tight text-[#00497F]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Resultados que
            <br />
            constroem confiança
          </h2>
        </div>
      </div>
    </section>
  );
}
