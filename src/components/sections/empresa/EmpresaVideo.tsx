"use client";

import { useState } from "react";
import Image from "next/image";

// Substitua pela URL real do vídeo (YouTube embed ou arquivo direto)
const VIDEO_URL = "https://www.youtube.com/embed/aPckAK35JS8?autoplay=1";

export function EmpresaVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          style={{ aspectRatio: "16/6" }}
          onClick={() => setPlaying(true)}
        >
          {!playing ? (
            <>
              {/* Thumbnail — /public/images/empresa/video-thumb.jpg */}
              <Image
                src="/images/empresa/video-thumb.jpg"
                alt="Vídeo institucional Fabiano Zaffalon"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Botão play */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <button
                  aria-label="Reproduzir vídeo institucional"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7 text-[#006EB7] translate-x-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <iframe
              src={VIDEO_URL}
              title="Vídeo institucional Fabiano Zaffalon"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
