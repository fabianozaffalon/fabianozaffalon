import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINO_CURRICULO = "contatopel@fzltda.com.br";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nome     = formData.get("nome")     as string;
    const email    = formData.get("email")    as string;
    const telefone = formData.get("telefone") as string;
    const cidade   = formData.get("cidade")   as string;
    const cargo    = formData.get("cargo")    as string;
    const mensagem = formData.get("mensagem") as string;
    const arquivo  = formData.get("arquivo")  as File | null;

    if (!nome || !email || !cidade) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    // Prepara anexo se enviado
    const attachments: { filename: string; content: Buffer }[] = [];
    if (arquivo && arquivo.size > 0) {
      const bytes = await arquivo.arrayBuffer();
      attachments.push({
        filename: arquivo.name,
        content: Buffer.from(bytes),
      });
    }

    await resend.emails.send({
      from: "Site Fabiano Zaffalon <noreply@fzltda.com.br>",
      to: DESTINO_CURRICULO,
      replyTo: email,
      subject: `[Currículo] ${nome}${cargo ? ` — ${cargo}` : ""}`,
      attachments,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
          <div style="background: #00497F; padding: 24px 32px;">
            <img src="https://fzltda.com.br/images/logo-white.svg" alt="Fabiano Zaffalon" height="32" />
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 24px; color: #00497F;">Nova candidatura recebida</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #595959; width: 140px;"><strong>Nome</strong></td>
                <td style="padding: 8px 0;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>E-mail</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #006EB7;">${email}</a></td>
              </tr>
              ${telefone ? `
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>Telefone</strong></td>
                <td style="padding: 8px 0;">${telefone}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>Cidade</strong></td>
                <td style="padding: 8px 0;">${cidade}</td>
              </tr>
              ${cargo ? `
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>Cargo pretendido</strong></td>
                <td style="padding: 8px 0;">${cargo}</td>
              </tr>` : ""}
              ${mensagem ? `
              <tr>
                <td style="padding: 8px 0; color: #595959; vertical-align: top;"><strong>Mensagem</strong></td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${mensagem}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #595959;"><strong>Currículo</strong></td>
                <td style="padding: 8px 0;">${arquivo ? `${arquivo.name} (em anexo)` : "Não enviado"}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #F6F6F6; font-size: 12px; color: #ABABAB;">
            Candidatura enviada pelo formulário Trabalhe Conosco do site fzltda.com.br
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[/api/curriculo]", error);
    return NextResponse.json({ error: "Erro ao enviar candidatura." }, { status: 500 });
  }
}
