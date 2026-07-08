export const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_CONSENT_MAX_AGE_DAYS = 90;

export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent:updated";
export const COOKIE_PREFERENCES_OPEN_EVENT = "cookie-preferences:open";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  timestamp: string;
};

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookieConsent;
    const ageMs = Date.now() - new Date(parsed.timestamp).getTime();
    const maxAgeMs = COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    if (Number.isNaN(ageMs) || ageMs > maxAgeMs) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean): void {
  const value: CookieConsent = {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(COOKIE_CONSENT_UPDATED_EVENT));
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_OPEN_EVENT));
}
