import Image from "next/image";

export function VarejoCampanha() {
  return (
    <section className="w-full">
      {/* Banner fullwidth sem padding — imagem ocupa toda a largura */}
      <div className="relative w-full" style={{ aspectRatio: "1440/400" }}>
        <Image
          src="/images/varejo/campanhas/campanha-1.jpg"
          alt="Campanha vigente Fabiano Zaffalon"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
