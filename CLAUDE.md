# Fabiano Zaffalon Distribuidora — site institucional

## 1. Visão geral e stack

Site institucional + área admin para a distribuidora Fabiano Zaffalon (unidades Pelotas e Rio Pardo, mais linha Broker Nestlé). Gerencia notícias, ofertas, cases e catálogo de marcas via painel `/admin`.

- **Next.js 16** (App Router), React 18, TypeScript
- **Prisma 6** + **Neon Postgres** (serverless)
- **NextAuth v5 (beta)** com provider Google — login restrito a usuários pré-cadastrados na tabela `User` (roles `OWNER` / `ADMIN` / `EDITOR`)
- **Cloudinary** (imagens/PDFs do catálogo) e **Vercel Blob** (upload direto client→blob)
- **Resend** (e-mails de contato/currículo), **Tailwind CSS**
- Deploy na **Vercel**, com 1 cron job (`/api/cron/jobs`, dias 1 e 15 às 3h) que renova o token do Instagram e apaga ofertas vencidas

## 2. Bancos Neon: produção vs dev — nunca misturar

O projeto Neon tem **branches separados** para produção e desenvolvimento, cada um com sua própria `DATABASE_URL`:

- **`.env`** (local, gitignored) → aponta para o branch de **dev** do Neon. É o que `next dev`/`next build` local usam.
- **Produção (Vercel)** → `DATABASE_URL` configurada direto nas env vars do projeto na Vercel, apontando para o branch de **produção**. Não existe neste checkout local.
- `.env.local` só tem `VERCEL_OIDC_TOKEN`, `RESEND_API_KEY` e `NEXT_PUBLIC_SITE_URL` — não tem credenciais de banco.

**Por que nunca misturar**: rodar `prisma migrate` ou scripts de backfill (`scripts/*.mjs`) com a `DATABASE_URL` errada aplica mudanças de schema/dados irreversíveis no banco errado. Sempre confirmar qual `.env` está ativo antes de rodar migrations ou scripts que escrevem no banco.

## 3. Estratégia de cache (ISR)

Motivação central: **reduzir consumo de Compute Units (CU) do Neon** — bots externos revisitando páginas a cada poucos minutos forçavam queries reais com `revalidate` baixo.

| Página | `revalidate` | Observação |
|---|---|---|
| `/` (home), `/noticias`, `/noticias/[slug]`, `/cases`, `/catalogo`, `/empresa` | `3600` (1h) | Antes era `60s`; subiu porque toda mutação via admin já dispara `revalidatePath` instantâneo — o tempo é só rede de segurança |
| `/ofertas` | `3600` | Antes era `force-dynamic` (sem cache algum) |

Regra geral: **toda rota de mutação admin (`POST`/`PUT`/`DELETE` em marcas, notícias, ofertas, cases) precisa chamar `revalidatePath()`** nas páginas públicas afetadas + `"/"`. Se uma entidade nova ganhar rota de mutação e isso for esquecido, o cache de 1h vira o único mecanismo de propagação (gap real de até 1h) — foi exatamente o bug corrigido em `/catalogo` (marcas não tinham `revalidatePath`).

**Instagram — client-side de propósito**: `InstagramFeed`/`InstagramGrid` eram Server Components que faziam `fetch` para `/api/instagram` com `revalidate: 300` embutido no próprio fetch. Isso **limitava o cache efetivo da home e de `/noticias` a 5 minutos**, mesmo com `revalidate: 3600` na página — o fetch interno do Instagram dominava. Solução: os dois componentes viraram `"use client"` e buscam `/api/instagram` via `useEffect` no browser, desacoplando totalmente do ISR da página. `/api/instagram` continua com seu próprio `revalidate = 300` (rate limit da Meta), mas isso não afeta mais o cache das páginas que o consomem.

## 4. Camadas de segurança

Defesa em profundidade com duas camadas independentes:

1. **`src/proxy.ts`** (middleware) — via `matcher`, intercepta `/admin/:path*`, `/api/marcas/:path*`, `/api/ofertas/:path*`, `/api/noticias/:path*`, `/api/cases/:path*`, `/api/upload/:path*`, `/api/upload-pdf/:path*`. Para as rotas de API (fora de `/admin`), qualquer request sem sessão recebe `401 JSON` direto — não é feito redirect. `/admin/usuarios` exige role `OWNER`.
2. **`requireAdminSession()`** (`src/lib/auth-guard.ts`) — chamada explicitamente dentro de cada handler `POST`/`PUT`/`DELETE` das rotas acima, **redundante de propósito**: continua protegendo mesmo se o `matcher` do proxy for alterado/quebrado no futuro.

**Rotas intencionalmente públicas** (sem auth): `GET` de marcas/notícias/ofertas/cases (conteúdo público do site), `/api/contato`, `/api/curriculo`, `/api/newsletter` (formulários públicos), `/api/instagram` (proxy de conteúdo público da Meta).

**Fora do proxy, com proteção própria**: `/api/usuarios` (`GET`/`POST`) e `/api/usuarios/[id]` não estão no `matcher` do proxy — verificam `session?.user?.role !== "OWNER"` diretamente dentro do handler, porque a regra é mais granular (só `OWNER`, não qualquer logado).

`/api/cron/jobs` usa proteção separada: exige header `Authorization: Bearer <CRON_SECRET>`, não sessão.

## 5. Padrões de código não-óbvios

- **Nunca usar `new Date().toISOString().split("T")[0]`** para pegar "a data de hoje" no fuso local — isso converte para UTC e pode virar o dia errado (ex: 23h de Brasília já é o dia seguinte em UTC). Padrão correto usado no projeto:
  ```ts
  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;
  ```
- **Datas vindas de `<input type="date">` (string `"YYYY-MM-DD"`) devem ser gravadas com horário fixo em UTC** para nunca cruzar fronteira de dia em nenhum fuso ao exibir: `publishedAt` grava meio-dia UTC (`Date.UTC(y, m-1, d, 12, 0, 0)`); `validade` de oferta grava 03:00 UTC do dia seguinte (= meia-noite de Brasília, UTC-3). Ver `src/app/api/noticias/route.ts` e `src/app/api/ofertas/route.ts`.
- **Toda mutação em marcas/notícias/ofertas/cases precisa de `revalidatePath()`** nas páginas públicas correspondentes + `/` (ver seção 3).
- Renovação do token do Instagram é um fluxo em cadeia documentado em comentário no topo de `src/app/api/cron/jobs/route.ts` — não gerar token direto do Graph API Explorer em produção (expira rápido); seguir o fluxo de exchange → `FACEBOOK_USER_ACCESS_TOKEN` → deriva `INSTAGRAM_ACCESS_TOKEN`.

## 6. Dívidas técnicas conhecidas (conscientes)

- **`eslint-config-next` travado em `14.2.3`** enquanto `next` está em `^16.2.4` — mismatch de versão não resolvido.
- **`next-auth` em beta** (`5.0.0-beta.31`) — API pode mudar antes do release estável.
- Sem testes automatizados no projeto (nenhum framework de teste no `package.json`).

## 7. Pendências reais em aberto

Nenhum `TODO`/`FIXME` pendente no código e working tree limpo na última sessão (2026-07-13). O item que estava explicitamente adiado — desacoplar o fetch do Instagram do ISR das páginas — **já foi resolvido** no commit `38573fd` (client-side fetch). Nada de pendência conhecida além das dívidas técnicas da seção 6.

## 8. Comandos úteis

```bash
npm run dev              # dev server (usa .env local, banco Neon dev)
npm run build             # prisma generate && prisma migrate deploy && next build
npx prisma studio          # inspecionar o banco apontado pela DATABASE_URL ativa
npx prisma migrate dev     # nova migration em dev (nunca rodar contra produção)
node scripts/backfill-noticia-published-at.mjs   # backfill pontual (raw SQL, não bumpa updatedAt)
```

Migrations rodam automaticamente no `build` (`prisma migrate deploy`) — não é preciso aplicar manualmente em produção.

---

## Log de Sessões

<!-- Adicionar uma entrada resumida por sessão relevante, mais recente no topo. -->
