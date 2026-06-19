import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusão de Dados",
  description: "Como solicitar a exclusão dos seus dados pessoais junto à Fabiano Zaffalon Distribuidora.",
  robots: { index: true, follow: true },
};

export default function ExclusaoDadosPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#00497F] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12">
          <h1 className="font-black leading-tight text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Exclusão de Dados
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-12 flex flex-col gap-8">

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">Como solicitar a exclusão dos seus dados</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              A Fabiano Zaffalon Distribuidora respeita o seu direito de controlar seus dados
              pessoais. Caso você tenha fornecido informações por meio dos formulários do nosso
              site (como nome, email, telefone ou mensagens enviadas) e deseje solicitar a
              exclusão desses dados, você pode fazê-lo a qualquer momento através dos canais
              abaixo.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">O que é excluído</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Ao solicitar a exclusão, removeremos permanentemente das nossas bases de dados:
            </p>
            <ul className="mt-3 flex flex-col gap-2 pl-5 text-sm leading-relaxed text-[#595959] list-disc">
              <li>Dados de contato enviados por formulários (nome, email, telefone);</li>
              <li>Histórico de mensagens e solicitações registradas;</li>
              <li>Cadastro em newsletter, se aplicável.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">Prazo de atendimento</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              As solicitações de exclusão de dados são atendidas em até 15 (quinze) dias úteis,
              conforme previsto pela Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              Você receberá uma confirmação por email assim que a exclusão for concluída.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">Login via redes sociais</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Caso você tenha interagido com nosso conteúdo através de integrações com redes
              sociais (como Facebook ou Instagram), e deseje que os dados associados a essa
              interação sejam removidos de nossos sistemas, a mesma solicitação de exclusão
              cobrirá esses dados, dentro do que estiver sob nosso controle direto.
            </p>
          </div>

          <div className="rounded-[12px] bg-[#F6F6F6] p-6">
            <h2 className="mb-3 text-lg font-bold text-[#00497F]">Como solicitar</h2>
            <p className="text-sm leading-relaxed text-[#595959]">
              Para solicitar a exclusão dos seus dados, envie um email para o endereço abaixo
              com o assunto <strong className="font-semibold text-[#00497F]">"Solicitação de Exclusão de Dados"</strong>,
              informando seu nome completo e o email ou telefone utilizado em nosso site:
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
