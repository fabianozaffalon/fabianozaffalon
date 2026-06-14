"use client";

import { useState } from "react";

export function NewsletterCompact() {
  const [email, setEmail] = useState("");

  return (
    <div className="rounded-[12px] bg-[#F6F6F6] p-5">
      <p className="text-sm font-bold text-[#006EB7]">Receba nossas notícias</p>
      <p className="mt-1 text-xs text-[#595959]">
        Cadastre-se e receba nossas novidades em primeira mão.
      </p>
      <div className="mt-3 flex overflow-hidden rounded-[8px] border border-[#D1D1D1] bg-white">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none"
        />
        <button className="flex items-center gap-1.5 bg-[#006EB7] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#00497F]">
          Cadastrar
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
