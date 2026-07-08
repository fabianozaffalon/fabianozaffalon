"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_PREFERENCES_OPEN_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookieConsent";

function ToggleSwitch({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label
      className={
        "relative inline-flex h-6 w-11 shrink-0 items-center " +
        (disabled ? "cursor-not-allowed" : "cursor-pointer")
      }
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={label}
      />
      <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-[#00497F] peer-disabled:bg-[#00497F]/50" />
      <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
    </label>
  );
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) {
      setVisible(true);
    }

    function handleReopen() {
      setAnalyticsChecked(readCookieConsent()?.analytics ?? false);
      setCustomizing(false);
      setVisible(true);
    }

    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleReopen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleReopen);
  }, []);

  if (!visible) return null;

  function confirm(analytics: boolean) {
    saveCookieConsent(analytics);
    setVisible(false);
    setCustomizing(false);
  }

  return (
    <div
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] w-full border-t border-gray-200 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-5 md:px-12">
        <p className="text-sm leading-relaxed text-[#595959]">
          Utilizamos cookies para garantir o funcionamento do site e, mediante seu
          consentimento, para fins de análise de audiência. Saiba mais em nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-semibold text-[#006EB7] underline underline-offset-2 hover:text-[#00497F]"
          >
            Política de Privacidade
          </Link>
          .
        </p>

        {customizing && (
          <div className="flex flex-col gap-4 rounded-[12px] bg-[#F6F6F6] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#00497F]">Necessários</p>
                <p className="text-xs text-[#595959]">
                  Essenciais para login e funcionamento do site.
                </p>
              </div>
              <ToggleSwitch checked disabled label="Cookies necessários — sempre ativos" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#00497F]">Analíticos</p>
                <p className="text-xs text-[#595959]">
                  Nos ajudam a entender como o site é utilizado.
                </p>
              </div>
              <ToggleSwitch
                checked={analyticsChecked}
                onChange={setAnalyticsChecked}
                label="Cookies analíticos"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => confirm(true)}
            className="rounded-[8px] bg-[#006EB7] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00497F]"
          >
            Aceitar tudo
          </button>
          <button
            type="button"
            onClick={() => confirm(false)}
            className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6]"
          >
            Rejeitar
          </button>
          {customizing ? (
            <button
              type="button"
              onClick={() => confirm(analyticsChecked)}
              className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6]"
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6]"
            >
              Personalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
