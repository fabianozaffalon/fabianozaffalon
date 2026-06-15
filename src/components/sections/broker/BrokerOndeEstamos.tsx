import Image from "next/image";

export function BrokerOndeEstamos() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">

          {/* Esquerda — mapa */}
          <div className="flex items-center justify-center">
            <div className="relative h-[320px] w-full md:h-[400px]">
              <Image
                src="/images/maps/broker-catalogo.svg"
                alt="Mapa Rio Pardo — Broker Nestlé Fabiano Zaffalon"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Direita — dados */}
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className="font-black leading-tight text-[#006EB7]"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Onde Estamos
              </h2>
              <div className="mt-3 rounded-full bg-[#006EB7]" style={{ width: "77px", height: "6px" }} />
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Image src="/images/icons/icon-pin.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-sm leading-snug text-[#595959]">
                  BR 471, km 158 — nº 900 — Rio Pardo – RS, Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/images/icons/icon-phone.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5 shrink-0" />
                <a href="tel:555137313426" className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]">
                  (51) 3731 3426
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/images/icons/icon-whatsapp.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5 shrink-0" />
                <a href="https://wa.me/5551983431014" target="_blank" rel="noopener noreferrer" className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]">
                  (51) 98343 1014
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/images/icons/icon-email.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5 shrink-0" />
                <a href="mailto:contatorp@fzltda.com.br" className="text-sm text-[#595959] transition-colors hover:text-[#006EB7]">
                  contatorp@fzltda.com.br
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
