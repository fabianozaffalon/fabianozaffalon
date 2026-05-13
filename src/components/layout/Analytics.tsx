/**
 * Analytics.tsx
 * Centraliza todos os scripts de rastreamento.
 * Substitua os IDs abaixo pelos reais antes do deploy.
 *
 * GTM_ID   → ex: "GTM-XXXXXXX"
 * GA4_ID   → ex: "G-XXXXXXXXXX"
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export function Analytics() {
  if (!GTM_ID && !GA4_ID) return null;

  return (
    <>
      {/* ── Google Tag Manager ── */}
      {GTM_ID && (
        <>
          {/* GTM <head> snippet */}
          {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
          <script
            id="gtm-script"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {/* GTM <noscript> — colocar logo após <body> via layout */}
        </>
      )}

      {/* ── Google Analytics 4 (standalone, sem GTM) ── */}
      {GA4_ID && !GTM_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <script
            id="ga4-script"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
            }}
          />
        </>
      )}
    </>
  );
}
