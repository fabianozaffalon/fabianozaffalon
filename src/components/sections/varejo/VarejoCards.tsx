import Image from "next/image";
import Link from "next/link";
import { TrackedAnchor } from "@/components/analytics/TrackedAnchor";

function CardIcon({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className="h-7 w-7 shrink-0"
        style={{ filter: "brightness(0) invert(1)" }}
      />
      <span className="text-xs font-medium leading-tight text-white">
        {label}
      </span>
    </div>
  );
}

// ── Varejo Local ──────────────────────────────────────────────────────────────
export function VarejoLocal() {
  return (
    <section className="bg-[#FFFFFF] pt-6 pb-0 md:pt-12">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{
            backgroundImage: "url('/images/varejo/varejo-local.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay escuro leve para legibilidade mobile */}
          <div className="absolute inset-0 bg-black/10 md:hidden" />

          <div className="relative flex items-center py-10 px-8 md:min-h-[clamp(340px,36vw,480px)] md:px-10 md:py-0">
            <div className="flex flex-col gap-4 w-full md:max-w-[480px]">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Varejo local
              </h2>
              <div className="h-1.5 w-16 bg-[#5BA3D9]" />
              <h3
                className="font-bold text-[#003861]"
                style={{ fontSize: "clamp(1.08rem, 2vw, 1.25rem)" }}
              >
                Juntos para construir negócios mais fortes
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Entendemos a{" "}
                <strong className="font-semibold text-white">
                  importância que o varejo local
                </strong>{" "}
                tem para as comunidades e para o desenvolvimento regional. Por
                isso, contamos com rotas programadas, controle rigoroso de
                qualidade e uma equipe preparada para auxiliar na construção de
                um mix adequado ao perfil de cada negócio. Tudo isso aliado ao
                acesso a grandes marcas do mercado por meio de negociações
                acessíveis, permitindo que pequenos varejistas ampliem suas
                oportunidades de venda e fortaleçam sua competitividade.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <CardIcon
                  src="/images/icons/icon-rotas.svg"
                  label="Rotas programadas"
                />
                <CardIcon
                  src="/images/icons/icon-qualidade.svg"
                  label="Controle rigoroso de qualidade"
                />
                <CardIcon
                  src="/images/icons/icon-equipe.svg"
                  label="Equipe preparada"
                />
                <CardIcon
                  src="/images/icons/icon-mix.svg"
                  label="Apoio na definição de mix"
                />
              </div>
              <TrackedAnchor
                event="click_whatsapp"
                params={{ local: "varejo_cards" }}
                href="https://wa.me/555332734110"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-[8px] bg-[#00497F] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#00497F]"
              >
                CONVERSE COM UM CONSULTOR
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Médio & Grande Varejo ─────────────────────────────────────────────────────
export function VarejoMedioGrande() {
  return (
    <section className="bg-[#FFFFFF] pt-4 pb-6 md:pt-10">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{
            backgroundImage: "url('/images/varejo/medio-grande.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/10 md:hidden" />

          <div className="relative flex items-center py-10 px-8 md:min-h-[clamp(340px,36vw,480px)] md:px-10 md:py-0">
            <div className="flex flex-col gap-4 w-full md:max-w-[480px]">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Médio & Grande Varejo
              </h2>
              <div className="h-1.5 w-16 bg-[#5BA3D9]" />
              <h3
                className="font-bold text-[#5BA3D9]"
                style={{ fontSize: "clamp(0.9rem, 1.85vw, 1.08rem)" }}
              >
                Eficiência e performance para grandes operações
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Para redes e operações de maior porte, disponibilizamos um
                atendimento especializado conduzido por profissionais dedicados
                ao relacionamento com grandes contas. Nossa equipe de Key
                Accounts atua de forma estratégica no planejamento de
                abastecimento, gestão de oportunidades e desenvolvimento
                comercial, garantindo eficiência operacional e soluções
                adequadas às necessidades de cada empreendimento.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <CardIcon
                  src="/images/icons/icon-atendimento.svg"
                  label="Atendimento especializado"
                />
                <CardIcon
                  src="/images/icons/icon-planejamento.svg"
                  label="Planejamento de abastecimento"
                />
                <CardIcon
                  src="/images/icons/icon-gestao.svg"
                  label="Gestão de oportunidades"
                />
                <CardIcon
                  src="/images/icons/icon-desenvolvimento.svg"
                  label="Desenvolvimento comercial"
                />
              </div>
              <TrackedAnchor
                event="click_whatsapp"
                params={{ local: "varejo_cards" }}
                href="https://wa.me/555332734110"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-[8px] bg-[#0084E5] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0084E5]"
              >
                CONVERSE COM UM CONSULTOR
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
