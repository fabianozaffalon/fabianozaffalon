import Image from "next/image";

export function FoodServiceCampanha() {
  return (
    <section className="w-full">
      <Image
        src="/images/foodservice/campanhas/campanha-fs-1.jpg"
        alt="Campanha vigente Food Service Fabiano Zaffalon"
        width={1440}
        height={480}
        className="w-full h-auto"
        sizes="100vw"
      />
    </section>
  );
}
