import Image from "next/image";
import Link from "next/link";

function CardIcon({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image src={src} alt="" aria-hidden="true" width={28} height={28} className="h-7 w-7 shrink-0" />
      <span className="text-xs font-medium leading-tight text-white">{label}</span>
    </div>
  );
}

// ── Varejo Local ──────────────────────────────────────────────────────────────
export function VarejoLocal() {
  return (
    <section className="bg-[#EFEFEF] pb-6">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        {/*
          overflow-hidden + rounded-[20px] no container garante que
          a foto respeite os cantos arredondados do card
        */}
        <div className="overflow-hidden rounded-[20px] bg-[#006EB7]">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Conteúdo — esquerda */}
            <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black text-white md:text-3xl">Varejo local</h2>
                <h3 className="font-bold text-white/90" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
                  Juntos para construir negócios mais fortes
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  Entendemos a{" "}
                  <strong className="font-semibold text-white">importância que o varejo local</strong>{" "}
                  tem para as comunidades e para o desenvolvimento regional. Por isso, contamos com
                  rotas programadas, controle rigoroso de qualidade e uma equipe preparada para
                  auxiliar na construção de um mix adequado ao perfil de cada negócio. Tudo isso
                  aliado ao acesso a grandes marcas do mercado por meio de negociações acessíveis,
                  permitindo que pequenos varejistas ampliem suas oportunidades de venda e
                  fortaleçam sua competitividade.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <CardIcon src="/images/icons/icon-rotas-azul.svg"    label="Rotas programadas" />
                <CardIcon src="/images/icons/icon-qualidade.svg"     label="Controle rigoroso de qualidade" />
                <CardIcon src="/images/icons/icon-equipe.svg"        label="Equipe preparada" />
                <CardIcon src="/images/icons/icon-mix-azul.svg"      label="Apoio na definição de mix" />
              </div>
              <Link
                href="#contato"
                className="self-start rounded-[8px] border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]"
              >
                CONVERSE COM UM CONSULTOR
              </Link>
            </div>

            {/* Foto — ocupa toda a coluna, cantos arredondados herdados do container */}
            <div className="relative hidden md:block" style={{ minHeight: "460px" }}>
              <Image
                src="/images/varejo/varejo-local.jpg"
                alt="Varejista local parceiro Fabiano Zaffalon"
                fill
                className="object-cover object-top"
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
// A imagem já tem o fundo azul escuro integrado — pessoa à direita, azul à esquerda.
// O card é apenas um container arredondado — a imagem preenche tudo.
export function VarejoMedioGrande() {
  return (
    <section className="bg-[#EFEFEF] pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="overflow-hidden rounded-[20px]">
          <div className="relative">

            {/* Imagem de fundo — fullwidth, já tem o azul escuro à esquerda */}
            <div className="relative w-full" style={{ minHeight: "clamp(340px, 36vw, 500px)" }}>
              <Image
                src="/images/varejo/medio-grande.jpg"
                alt="Executivo Key Account Fabiano Zaffalon"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Conteúdo sobreposto — alinhado à esquerda sobre o fundo azul da imagem */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[1280px] px-8 md:px-12">
                <div className="max-w-[480px] flex flex-col gap-4">
                  <h2 className="text-2xl font-black text-white md:text-3xl">
                    Médio & Grande Varejo
                  </h2>
                  <div className="h-0.5 w-16 bg-[#006EB7]" />
                  <h3
                    className="font-bold text-[#5BA3D9]"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
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

                  {/* Ícones */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-2">
                    <CardIcon src="/images/icons/icon-atendimento.svg"     label="Atendimento especializado" />
                    <CardIcon src="/images/icons/icon-planejamento.svg"    label="Planejamento de abastecimento" />
                    <CardIcon src="/images/icons/icon-gestao.svg"          label="Gestão de oportunidades" />
                    <CardIcon src="/images/icons/icon-desenvolvimento.svg" label="Desenvolvimento comercial" />
                  </div>

                  <Link
                    href="#contato"
                    className="self-start mt-2 rounded-[8px] border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#00497F]"
                  >
                    CONVERSE COM UM CONSULTOR
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
