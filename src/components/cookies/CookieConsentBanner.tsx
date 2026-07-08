"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  COOKIE_PREFERENCES_OPEN_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookieConsent";

const TRANSITION_MS = 300;

function CookieIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#595959]"
    >
      <path d="M20.5 12.6a2.5 2.5 0 0 1-2.83-2.83 2.5 2.5 0 0 1-2.87-3.19A2.5 2.5 0 0 1 11.6 3.5 9 9 0 1 0 20.5 12.6Z" />
      <circle cx="8.5" cy="10.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="17" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
      <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-[#00497F] peer-disabled:bg-[#00497F]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[#006EB7] peer-focus-visible:ring-offset-2" />
      <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
    </label>
  );
}

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  function show() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMounted(true);
    // Monta primeiro no estado "saída" (opacity-0/translate) e só then
    // aplica o estado "entrado" no próximo frame, para o navegador ter
    // algo de onde transicionar (senão a transição não roda).
    requestAnimationFrame(() => setEntered(true));
  }

  function hide() {
    setEntered(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMounted(false);
      setCustomizing(false);
    }, TRANSITION_MS);
  }

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) {
      show();
    }

    function handleReopen() {
      setAnalyticsChecked(readCookieConsent()?.analytics ?? false);
      setCustomizing(false);
      show();
    }

    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleReopen);
    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, handleReopen);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (entered) {
      acceptButtonRef.current?.focus();
    }
  }, [entered]);

  if (!mounted) return null;

  function confirm(analytics: boolean) {
    saveCookieConsent(analytics);
    hide();
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Consentimento de cookies"
      className={
        "fixed inset-x-0 bottom-0 z-[70] w-full border-t border-gray-200 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] " +
        "transition-all duration-300 ease-in-out " +
        (entered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")
      }
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-5 md:px-12">
        <div className="flex items-start gap-3">
          <CookieIcon />
          <p className="text-sm leading-relaxed text-[#595959]">
            Utilizamos cookies para garantir o funcionamento do site e, mediante seu
            consentimento, para fins de análise de audiência. Saiba mais em nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="rounded-sm font-semibold text-[#006EB7] underline underline-offset-2 hover:text-[#00497F] focus:outline-none focus:ring-2 focus:ring-[#006EB7] focus:ring-offset-2"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        {customizing && (
          <div className="flex flex-col gap-4 rounded-[12px] bg-[#F6F6F6] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#00497F]">Necessários</p>
                <p className="text-xs text-[#595959]">
                  Essenciais para login e funcionamento do site.
                </p>
              </div>
              <ToggleSwitch checked disabled label="Cookies necessários, sempre ativos" />
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
                label="Ativar ou desativar cookies analíticos"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            ref={acceptButtonRef}
            type="button"
            onClick={() => confirm(true)}
            className="rounded-[8px] bg-[#006EB7] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00497F] focus:outline-none focus:ring-2 focus:ring-[#006EB7] focus:ring-offset-2"
          >
            Aceitar tudo
          </button>
          <button
            type="button"
            onClick={() => confirm(false)}
            className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6] focus:outline-none focus:ring-2 focus:ring-[#006EB7] focus:ring-offset-2"
          >
            Rejeitar
          </button>
          {customizing ? (
            <button
              type="button"
              onClick={() => confirm(analyticsChecked)}
              className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6] focus:outline-none focus:ring-2 focus:ring-[#006EB7] focus:ring-offset-2"
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="rounded-[8px] border border-[#00497F]/30 px-5 py-2 text-sm font-medium text-[#00497F] transition-colors hover:bg-[#F6F6F6] focus:outline-none focus:ring-2 focus:ring-[#006EB7] focus:ring-offset-2"
            >
              Personalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
