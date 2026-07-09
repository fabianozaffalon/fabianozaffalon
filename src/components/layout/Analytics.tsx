"use client";

/**
 * Analytics.tsx
 * Centraliza todos os scripts de rastreamento.
 * Substitua os IDs abaixo pelos reais antes do deploy.
 *
 * GTM_ID   → ex: "GTM-XXXXXXX"
 * GA4_ID   → ex: "G-XXXXXXXXXX"
 *
 * Só carrega os scripts se o usuário tiver consentido com cookies
 * analíticos (banner de cookies) — ver src/lib/cookieConsent.ts.
 */

import { useEffect, useState } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_UPDATED_EVENT, readCookieConsent } from "@/lib/cookieConsent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    setAnalyticsAllowed(readCookieConsent()?.analytics ?? false);

    function handleUpdate() {
      setAnalyticsAllowed(readCookieConsent()?.analytics ?? false);
    }

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdate);
  }, []);

  if ((!GTM_ID && !GA4_ID) || !analyticsAllowed) return null;

  return (
    <>
      {/* ── Google Tag Manager ── */}
      {GTM_ID && (
        <>
          {/* GTM <head> snippet */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
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
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
            }}
          />
        </>
      )}
    </>
  );
}
