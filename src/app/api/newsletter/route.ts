import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINO_NEWSLETTER = "contatopel@fzltda.com.br";

function emailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !emailValido(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Site Fabiano Zaffalon <noreply@fzltda.com.br>",
      to: DESTINO_NEWSLETTER,
      replyTo: email,
      subject: "Novo cadastro na newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
          <div style="background: #00497F; padding: 24px 32px;">
            <img src="https://fzltda.com.br/images/logo-white.svg" alt="Fabiano Zaffalon" height="32" />
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 24px; color: #00497F;">Novo cadastro na newsletter</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #595959; width: 100px;"><strong>E-mail</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #006EB7;">${email}</a></td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #F6F6F6; font-size: 12px; color: #ABABAB;">
            Cadastro feito pelo banner de newsletter do site fzltda.com.br
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[/api/newsletter]", error);
    return NextResponse.json({ error: "Erro ao cadastrar e-mail." }, { status: 500 });
  }
}
