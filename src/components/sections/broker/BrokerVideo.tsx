"use client";

import { useState } from "react";
import Image from "next/image";

export function BrokerVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: "16/9" }}>
          {!playing ? (
            <>
              <Image
                src="/images/broker/video-thumb-broker.jpg"
                alt="Vídeo institucional Broker Fabiano Zaffalon"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <button
                onClick={() => setPlaying(true)}
                aria-label="Reproduzir vídeo"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110 md:h-20 md:w-20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#006EB7" className="h-8 w-8 translate-x-0.5 md:h-10 md:w-10">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </button>
            </>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/CdqWMYdg_2M?autoplay=1"
              title="Vídeo institucional Broker Fabiano Zaffalon"
              allow="autoplay; fullscreen"
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
