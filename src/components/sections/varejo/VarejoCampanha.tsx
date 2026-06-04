import Image from "next/image";

export function VarejoCampanha() {
  return (
    <section className="w-full">
      <div
        className="relative w-full"
        style={{ aspectRatio: "1440/480" }}
      >
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
