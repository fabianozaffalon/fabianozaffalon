import Image from "next/image";

export function NoticiasHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(240px, 28vw, 340px)" }}
    >
      {/* Imagem já tem efeitos — sem overlay */}
      <Image
        src="/images/noticias/hero-noticias.jpg"
        alt="Notícias Fabiano Zaffalon"
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
          <h1
            className="font-black text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Notícias
          </h1>
          <p className="mt-2 max-w-[380px] text-sm text-white/90">
            Fique por dentro das novidades, lançamentos,
            <br />parcerias e tudo o que movimenta o nosso mundo.
          </p>
        </div>
      </div>
    </section>
  );
}
