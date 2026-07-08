import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: "Política de Privacidade da Fabiano Zaffalon Distribuidora.",
  path: "/politica-de-privacidade",
});

export default function PoliticaPrivacidadePage() {
  return (
    <main className="bg-white">
      <section className="bg-[#00497F] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12">
          <h1 className="font-black leading-tight text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12 flex flex-col gap-8">

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">1. Introdução</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              A Fabiano Zaffalon Distribuidora ("nós", "nosso" ou "empresa") respeita a privacidade
              dos visitantes do nosso site e está comprometida em proteger os dados pessoais
              fornecidos por você. Esta Política de Privacidade descreve como coletamos, usamos,
              armazenamos e protegemos suas informações ao utilizar nosso site e seus formulários.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">2. Quais dados coletamos</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Coletamos dados que você nos fornece voluntariamente ao preencher formulários em
              nosso site, como nome, telefone, email e mensagem, quando você entra em contato
              conosco, solicita informações sobre nossos produtos e serviços ou se cadastra em
              nossa newsletter.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#595959]">
              Também podemos coletar dados de navegação de forma automática e anônima, como
              páginas visitadas e tempo de permanência, por meio de ferramentas de análise como
              Google Analytics, para entender melhor como nosso site é utilizado.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">3. Como usamos seus dados</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Utilizamos os dados coletados exclusivamente para:
            </p>
            <ul className="mt-3 flex flex-col gap-2 pl-5 text-sm leading-relaxed text-[#595959] list-disc">
              <li>Responder suas solicitações de contato e orçamento;</li>
              <li>Enviar comunicações sobre nossos produtos, serviços e novidades, quando autorizado;</li>
              <li>Melhorar a experiência de navegação em nosso site;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">4. Compartilhamento de dados</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros. Seus
              dados podem ser compartilhados apenas com prestadores de serviço que nos auxiliam
              na operação do site (como provedores de hospedagem e envio de email), sempre sob
              obrigação de confidencialidade.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">5. Cookies</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Utilizamos cookies para garantir o funcionamento adequado do site e, mediante seu
              consentimento, para fins de análise de audiência. Classificamos os cookies
              utilizados nas seguintes categorias:
            </p>

            <h3 className="mt-5 mb-2 text-sm font-bold text-[#00497F]">5.1. Cookies Necessários</h3>
            <p className="text-sm leading-relaxed text-[#595959]">
              Essenciais para o funcionamento básico do site e para a prestação dos serviços
              solicitados por você, como manter sua sessão ativa ao acessar o painel
              administrativo. Esses cookies não podem ser desativados, pois sua ausência
              compromete o funcionamento do site, e seu tratamento se baseia na execução do
              serviço solicitado (art. 7º, V, da LGPD).
            </p>

            <h3 className="mt-5 mb-2 text-sm font-bold text-[#00497F]">5.2. Cookies Analíticos</h3>
            <p className="text-sm leading-relaxed text-[#595959]">
              Utilizados para compreender como os visitantes interagem com o site (páginas mais
              acessadas, tempo de navegação, origem do tráfego, dispositivo utilizado), por meio
              de ferramentas de análise de audiência como Google Analytics, Google Tag Manager,
              Microsoft Clarity, Meta Pixel, Hotjar, ou outras ferramentas de métricas
              equivalentes. Esses cookies somente são ativados mediante seu consentimento
              prévio, concedido através do banner de cookies exibido em sua primeira visita.
            </p>

            <h3 className="mt-5 mb-2 text-sm font-bold text-[#00497F]">5.3. Gerenciamento de Preferências</h3>
            <p className="text-sm leading-relaxed text-[#595959]">
              Você pode aceitar, recusar ou personalizar o uso de cookies analíticos a qualquer
              momento através do link &ldquo;Preferências de Cookies&rdquo;, disponível no
              rodapé do site. Sua escolha pode ser alterada ou revogada a qualquer momento, sem
              prejuízo ao acesso às funcionalidades essenciais do site.
            </p>

            <h3 className="mt-5 mb-2 text-sm font-bold text-[#00497F]">5.4. Período de Retenção</h3>
            <p className="text-sm leading-relaxed text-[#595959]">
              As preferências de cookies ficam armazenadas em seu navegador por até 3 meses,
              após os quais será solicitado um novo consentimento. Cookies de sessão são
              automaticamente descartados ao fechar o navegador.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">6. Seus direitos</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018),
              você tem direito a:
            </p>
            <ul className="mt-3 flex flex-col gap-2 pl-5 text-sm leading-relaxed text-[#595959] list-disc">
              <li>Confirmar a existência de tratamento dos seus dados;</li>
              <li>Acessar seus dados pessoais;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a exclusão dos seus dados pessoais;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[#595959]">
              Para exercer qualquer um desses direitos, consulte nossa{" "}
              <Link href="/exclusao-de-dados" className="font-semibold text-[#006EB7] underline underline-offset-2 hover:text-[#00497F]">
                página de Exclusão de Dados
              </Link>{" "}
              ou entre em contato conosco pelos canais abaixo.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">7. Segurança</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
              pessoais contra acesso não autorizado, perda, alteração ou divulgação indevida.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">8. Alterações nesta política</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que
              você a revise regularmente. A data da última atualização está indicada no topo
              desta página.
            </p>
          </div>

          <div className="rounded-[12px] bg-[#F6F6F6] p-6">
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">9. Contato</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos
              seus dados pessoais, entre em contato conosco:
            </p>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-[#595959]">
              <li>Email: <a href="mailto:contatopel@fzltda.com.br" className="font-semibold text-[#006EB7] hover:underline">contatopel@fzltda.com.br</a></li>
              <li>Telefone: (53) 3273 4110</li>
            </ul>
          </div>

        </div>
      </section>
    </main>
  );
}
