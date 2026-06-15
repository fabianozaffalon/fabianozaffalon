"use client";

import { useState } from "react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="rounded-[20px] bg-[#006EB7] px-8 py-10 md:px-12 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">

            {/* Texto esquerda */}
            <div>
              <h2
                className="font-black leading-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                Receba nossas
                <br />notícias
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Cadastre-se e receba nossas novidades em primeira mão.
              </p>
            </div>

            {/* Campo + botão direita */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-[8px] border border-white/30 bg-white px-5 py-3 text-sm text-[#1A1A1A] placeholder:text-[#ABABAB] outline-none focus:border-[#006EB7] transition-colors"
              />
              <button className="flex shrink-0 items-center justify-center gap-2 rounded-[8px] border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#006EB7]">
                Cadastrar
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
