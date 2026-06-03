import Image from "next/image";
import Link from "next/link";

// ── Ícones inline compartilhados ──────────────────────────────────────────────
function CardIcon({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 brightness-0 invert"
      />
      <span className="text-xs font-medium text-white leading-tight">{label}</span>
    </div>
  );
}

// ── Varejo Local ──────────────────────────────────────────────────────────────
export function VarejoLocal() {
  return (
    <section className="bg-[#EFEFEF] pb-6">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="relative overflow-hidden rounded-[20px] bg-[#006EB7]">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Conteúdo — esquerda */}
            <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black text-white md:text-3xl">
                  Varejo local
                </h2>
                <h3
                  className="font-bold text-white/90"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  Juntos para construir negócios mais fortes
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  Entendemos a{" "}
                  <strong className="font-semibold text-white">importância que o varejo local</strong>{" "}
                  tem para as comunidades e para o desenvolvimento regional. Por isso,
                  contamos com rotas programadas, controle rigoroso de qualidade e uma
                  equipe preparada para auxiliar na construção de um mix adequado ao
                  perfil de cada negócio. Tudo isso aliado ao acesso a grandes marcas
                  do mercado por meio de negociações acessíveis, permitindo que pequenos
                  varejistas ampliem suas oportunidades de venda e fortaleçam sua
                  competitividade.
                </p>
              </div>

              {/* Ícones — 2x2 grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <CardIcon src="/images/icons/icon-rotas.svg"    label="Rotas programadas" />
                <CardIcon src="/images/icons/icon-qualidade.svg" label="Controle rigoroso de qualidade" />
                <CardIcon src="/images/icons/icon-equipe.svg"   label="Equipe preparada" />
                <CardIcon src="/images/icons/icon-mix.svg"      label="Apoio na definição de mix" />
              </div>

              {/* Botão */}
              <Link
                href="#contato"
                className="self-start rounded-[8px] border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]"
              >
                CONVERSE COM UM CONSULTOR
              </Link>
            </div>

            {/* Foto — direita */}
            <div className="relative hidden md:block min-h-[420px]">
              <Image
                src="/images/varejo/varejo-local.jpg"
                alt="Varejista local parceiro Fabiano Zaffalon"
                fill
                className="object-cover object-center rounded-r-[20px]"
                sizes="50vw"
              />
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
    <section className="bg-[#EFEFEF] pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="relative overflow-hidden rounded-[20px] bg-[#00497F]">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Conteúdo — esquerda */}
            <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black text-white md:text-3xl">
                  Médio & Grande Varejo
                </h2>
                {/* Linha divisória azul clara */}
                <div className="h-0.5 w-16 bg-[#006EB7]" />
                <h3
                  className="font-bold text-[#006EB7]"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  Eficiência e performance para grandes operações
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  Para redes e operações de maior porte, disponibilizamos um atendimento
                  especializado conduzido por profissionais dedicados ao relacionamento com
                  grandes contas. Nossa equipe de Key Accounts atua de forma estratégica no
                  planejamento de abastecimento, gestão de oportunidades e desenvolvimento
                  comercial, garantindo eficiência operacional e soluções adequadas às
                  necessidades de cada empreendimento.
                </p>
              </div>

              {/* Ícones — 2x2 grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <CardIcon src="/images/icons/icon-atendimento.svg"   label="Atendimento especializado" />
                <CardIcon src="/images/icons/icon-planejamento.svg"  label="Planejamento de abastecimento" />
                <CardIcon src="/images/icons/icon-gestao.svg"        label="Gestão de oportunidades" />
                <CardIcon src="/images/icons/icon-desenvolvimento.svg" label="Desenvolvimento comercial" />
              </div>

              {/* Botão */}
              <Link
                href="#contato"
                className="self-start rounded-[8px] border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#00497F]"
              >
                CONVERSE COM UM CONSULTOR
              </Link>
            </div>

            {/* Foto — direita */}
            <div className="relative hidden md:block min-h-[420px]">
              <Image
                src="/images/varejo/medio-grande.jpg"
                alt="Executivo de key account Fabiano Zaffalon"
                fill
                className="object-cover object-center rounded-r-[20px]"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
