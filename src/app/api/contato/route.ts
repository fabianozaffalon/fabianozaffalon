import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_POR_UNIDADE: Record<string, { email: string; label: string }> = {
  pelotas:   { email: "contatopel@fzltda.com.br", label: "Pelotas" },
  "rio-pardo": { email: "contatorp@fzltda.com.br",  label: "Rio Pardo" },
  broker:    { email: "starb@fzltda.com.br",       label: "Broker Nestlé" },
};

export async function POST(req: Request) {
  try {
    const { nome, email, assunto, mensagem, unidade } = await req.json();

    if (!nome || !email || !assunto || !mensagem || !unidade) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const destino = EMAIL_POR_UNIDADE[unidade];
    if (!destino) {
      return NextResponse.json({ error: "Unidade inválida." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Site Fabiano Zaffalon <noreply@fzltda.com.br>",
      to: destino.email,
      replyTo: email,
      subject: `[Contato ${destino.label}] ${assunto}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
          <div style="background: #00497F; padding: 24px 32px;">
            <img src="https://fzltda.com.br/images/logo-white.svg" alt="Fabiano Zaffalon" height="32" />
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 24px; color: #00497F;">Nova mensagem recebida — ${destino.label}</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #595959; width: 100px;"><strong>Nome</strong></td>
                <td style="padding: 8px 0;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>E-mail</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #006EB7;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>Assunto</strong></td>
                <td style="padding: 8px 0;">${assunto}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #595959; vertical-align: top;"><strong>Mensagem</strong></td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${mensagem}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #F6F6F6; font-size: 12px; color: #ABABAB;">
            Mensagem enviada pelo formulário de contato do site fzltda.com.br
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[/api/contato]", error);
    return NextResponse.json({ error: "Erro ao enviar mensagem." }, { status: 500 });
  }
}
