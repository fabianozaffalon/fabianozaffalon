"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

export function NoticiasTabs({
  noticiasSlot,
  instagramSlot,
}: {
  noticiasSlot: ReactNode;
  instagramSlot: ReactNode;
}) {
  const searchParams = useSearchParams();
  const [aba, setAba] = useState<"noticias" | "instagram">("noticias");

  useEffect(() => {
    if (searchParams.get("aba") === "instagram") {
      setAba("instagram");
    }
  }, [searchParams]);

  return (
    <div>
      {/* Botões de troca */}
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="mb-8 flex w-fit gap-1 rounded-[10px] bg-[#F6F6F6] p-1">
          <button
            onClick={() => setAba("noticias")}
            className={
              "rounded-[8px] px-5 py-2.5 text-sm font-semibold transition-colors " +
              (aba === "noticias" ? "bg-[#006EB7] text-white" : "text-[#595959] hover:text-[#006EB7]")
            }
          >
            Notícias
          </button>
          <button
            onClick={() => setAba("instagram")}
            className={
              "flex items-center gap-1.5 rounded-[8px] px-5 py-2.5 text-sm font-semibold transition-colors " +
              (aba === "instagram" ? "bg-[#006EB7] text-white" : "text-[#595959] hover:text-[#006EB7]")
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
            Instagram
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className={aba === "noticias" ? "block" : "hidden"}>
        {noticiasSlot}
      </div>
      <div className={aba === "instagram" ? "block" : "hidden"}>
        {instagramSlot}
      </div>
    </div>
  );
}
