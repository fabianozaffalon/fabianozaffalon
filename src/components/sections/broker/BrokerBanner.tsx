import Image from "next/image";

export function BrokerBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/broker/banner-broker.jpg"
        alt="Nestlé — Broker Fabiano Zaffalon"
        width={1920}
        height={640}
        className="w-full h-auto"
        sizes="100vw"
      />
    </section>
  );
}
