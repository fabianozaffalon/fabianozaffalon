import Image from "next/image";
import Link from "next/link";

export function BrokerHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* ── Mobile — texto em cima, imagem embaixo ── */}
      <div className="md:hidden">
        <div className="bg-white px-5 pb-6 pt-8">
          <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-[#00497F]">
            <Link href="/" className="underline underline-offset-2 hover:text-[#006EB7] transition-colors">
              HOME
            </Link>
            <span>›</span>
            <span className="font-semibold">BROKER NESTLÉ</span>
          </nav>
          <h1
            className="font-black leading-tight text-[#00497F]"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.25rem)" }}
          >
            Broker Nestlé:
          </h1>
          <h2
            className="font-bold leading-tight text-[#00497F]"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)" }}
          >
            Resultados que
            <br />constroem confiança
          </h2>
        </div>
        <div className="relative w-full" style={{ aspectRatio: "750/420" }}>
          <Image
            src="/images/broker/hero-broker-mobile.jpg"
            alt="Broker Nestlé — Fabiano Zaffalon"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* ── Desktop — imagem fullwidth com texto sobreposto ── */}
      <div className="hidden md:block">
        <Image
          src="/images/broker/hero-broker.jpg"
          alt="Broker Nestlé — Fabiano Zaffalon"
          width={1920}
          height={640}
          className="w-full h-auto"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
            <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-[#00497F]">
              <Link href="/" className="underline underline-offset-2 hover:text-[#006EB7] transition-colors">
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
              <br />constroem confiança
            </h2>
          </div>
        </div>
      </div>

    </section>
  );
}
