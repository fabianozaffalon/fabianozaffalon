"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { UNIDADES } from "@/lib/unidades";

// Este modal (já usado em vários pontos do site) mostra só as duas
// distribuidoras — o Broker Nestlé tem seu próprio fluxo separado
// (ver UnidadesModal.tsx e CtaBannerBroker.tsx).
const UNIDADES_MODAL = UNIDADES.filter((u) => u.id !== "broker");

interface ConsultorModalContextValue {
  abrir: () => void;
  fechar: () => void;
}

const ConsultorModalContext = createContext<ConsultorModalContextValue | null>(
  null
);

export function useConsultorModal() {
  const ctx = useContext(ConsultorModalContext);
  if (!ctx) {
    throw new Error(
      "useConsultorModal precisa estar dentro de <ConsultorModalProvider>"
    );
  }
  return ctx;
}

export function ConsultorModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aberto, setAberto] = useState(false);

  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  // Fecha com ESC
  useEffect(() => {
    if (!aberto) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") fechar();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, fechar]);

  return (
    <ConsultorModalContext.Provider value={{ abrir, fechar }}>
      {children}
      {aberto && <ConsultorModalDialog onClose={fechar} />}
    </ConsultorModalContext.Provider>
  );
}

export function ConsultorButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { abrir } = useConsultorModal();
  return (
    <button
      type="button"
      onClick={abrir}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#006EB7] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#006EB7] border-2 border-transparent hover:border-[#006EB7]"
      }
    >
      {children}
    </button>
  );
}

// ── Dialog ───────────────────────────────────────────────────────────────

function ConsultorModalDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] rounded-[20px] bg-white p-6 shadow-2xl sm:rounded-[16px] sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho centralizado */}
        <div className="mb-6 text-center">
          <p
            id="consultor-modal-title"
            className="text-lg font-bold text-[#00497F]"
          >
            Fale com um consultor
          </p>
          <p className="mt-1 text-sm text-[#595959]">
            Escolha a unidade mais próxima de você
          </p>
        </div>

        {/* Botão de fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#ABABAB] transition-colors hover:bg-[#F5F5F5] hover:text-[#595959] sm:right-5 sm:top-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>

        <div className="flex flex-col gap-3">
          {UNIDADES_MODAL.map((u) => (
            <a
              key={u.id}
              href={u.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 rounded-[12px] border border-[#D1D1D1] px-4 py-3.5 transition-all duration-200 hover:border-[#006EB7] hover:bg-[#EBF4FF] hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#006EB7]/10">
                <Image
                  src="/images/icons/icon-whatsapp.svg"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold text-[#00497F]">
                  {u.label}
                </span>
                <span className="block text-xs text-[#595959]">
                  {u.whatsapp}
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 shrink-0 text-[#ABABAB]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
