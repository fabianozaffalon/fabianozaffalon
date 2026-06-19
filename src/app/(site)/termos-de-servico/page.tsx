import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço de uso do site da Fabiano Zaffalon Distribuidora.",
  robots: { index: true, follow: true },
};

export default function TermosServicoPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#00497F] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12">
          <h1 className="font-black leading-tight text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Termos de Serviço
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12 flex flex-col gap-8">

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">1. Aceitação dos termos</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Ao acessar e utilizar o site da Fabiano Zaffalon Distribuidora ("nós", "nosso" ou
              "empresa"), você concorda em cumprir e estar vinculado aos termos e condições de
              uso descritos a seguir. Caso não concorde com algum destes termos, recomendamos
              que não utilize este site.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">2. Uso do site</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Este site tem caráter institucional e tem como objetivo apresentar informações
              sobre a Fabiano Zaffalon Distribuidora, seus produtos, marcas representadas,
              notícias e canais de contato. O uso do site deve ser feito de forma lícita,
              respeitosa e em conformidade com a legislação brasileira vigente.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">3. Propriedade intelectual</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Todo o conteúdo disponibilizado neste site — incluindo textos, imagens, logotipos,
              marcas, layout e demais elementos visuais — é de propriedade da Fabiano Zaffalon
              Distribuidora ou de seus respectivos parceiros e fornecedores, sendo protegido pela
              legislação de propriedade intelectual. É vedada a reprodução, distribuição ou uso
              comercial não autorizado de qualquer conteúdo deste site.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">4. Formulários e informações fornecidas</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Ao preencher qualquer formulário disponível em nosso site, você declara que as
              informações fornecidas são verdadeiras e de sua responsabilidade. O tratamento
              desses dados segue o disposto em nossa Política de Privacidade.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">5. Links para sites de terceiros</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Nosso site pode conter links para sites de terceiros, incluindo redes sociais e
              parceiros comerciais. Não nos responsabilizamos pelo conteúdo, política de
              privacidade ou práticas desses sites externos.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">6. Limitação de responsabilidade</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Envidamos esforços para manter as informações deste site atualizadas e precisas,
              porém não garantimos a ausência de erros, interrupções ou indisponibilidades
              temporárias. As informações sobre produtos, marcas e ofertas têm caráter
              informativo e podem ser alteradas sem aviso prévio.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">7. Alterações nestes termos</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Estes Termos de Serviço podem ser atualizados periodicamente, a critério da Fabiano
              Zaffalon Distribuidora. Recomendamos a revisão periódica desta página. A data da
              última atualização está indicada no topo deste documento.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">8. Legislação aplicável</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Estes Termos de Serviço são regidos pelas leis da República Federativa do Brasil.
              Qualquer controvérsia decorrente do uso deste site será submetida ao foro da
              comarca de Pelotas, Rio Grande do Sul.
            </p>
          </div>

          <div className="rounded-[12px] bg-[#F6F6F6] p-6">
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">9. Contato</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Em caso de dúvidas sobre estes Termos de Serviço, entre em contato conosco:
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
