import Image from "next/image";

export function BrokerBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(200px, 25vw, 320px)" }}>
      <Image
        src="/images/broker/banner-broker.jpg"
        alt="Nestlé — Broker Fabiano Zaffalon"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
