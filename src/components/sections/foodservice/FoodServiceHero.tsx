import Image from "next/image";
import Link from "next/link";

export function FoodServiceHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
    >
      {/* Imagem desktop (md+) */}
      <Image
        src="/images/foodservice/hero-foodservice.jpg"
        alt="Chef parceiro Fabiano Zaffalon"
        fill
        priority
        className="hidden md:block object-cover object-center"
        sizes="100vw"
      />

      {/* Imagem mobile (< md) */}
      <Image
        src="/images/foodservice/hero-foodservice-mobile.jpg"
        alt="Chef parceiro Fabiano Zaffalon"
        fill
        priority
        className="block md:hidden object-cover object-right"
        sizes="100vw"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "clamp(280px, 32vw, 420px)" }}
        >
          {/* Breadcrumb */}
          <nav
            className="mb-5 flex items-center gap-2 text-xs font-medium text-white/80"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="underline underline-offset-2 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-white/50">›</span>
            <span className="text-white/80">ATUAÇÃO</span>
            <span className="text-white/50">›</span>
            <span className="text-white font-semibold">FOOD SERVICE</span>
          </nav>

          {/* Título */}
          <h1
            className="leading-[1.15] text-white max-w-[560px]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            <strong className="font-black">Food Service:</strong>
            <br />
            <span className="font-normal">Confiança que</span>
            <br />
            <span className="font-normal">abastece seu negócio</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
