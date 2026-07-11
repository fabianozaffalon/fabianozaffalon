/**
 * Ponte com o dataLayer do GTM/GA4.
 * window.dataLayer pode ainda não existir (GTM não carregado por falta de
 * consentimento de cookies) — por isso sempre garantimos o array antes do push.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}
