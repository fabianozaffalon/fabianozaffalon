import Image from "next/image";

type InstagramPost = {
  id: string;
  caption: string | null;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/instagram`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}

function truncarLegenda(caption: string | null, max: number = 100): string {
  if (!caption) return "";
  const limpo = caption.replace(/\n+/g, " ").trim();
  return limpo.length > max ? limpo.slice(0, max).trim() + "..." : limpo;
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function InstagramGrid() {
  const posts = await getInstagramPosts();

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-[#BCBABA]">
              Não foi possível carregar as publicações do Instagram no momento.
            </p>
            <a
              href="https://www.instagram.com/fabianozaffalon.cia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#006EB7] underline underline-offset-2"
            >
              Visitar nosso Instagram
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const imagem =
                post.media_type === "VIDEO"
                  ? post.thumbnail_url
                  : post.media_url;
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[16px]"
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "1/1" }}
                  >
                    {imagem && (
                      <Image
                        src={imagem}
                        alt={
                          truncarLegenda(post.caption, 60) ||
                          "Publicação Instagram"
                        }
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          stroke="#E1306C"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4.5"
                          stroke="#E1306C"
                          strokeWidth="2"
                        />
                        <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C" />
                      </svg>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs text-white/70">
                        {formatarData(post.timestamp)}
                      </p>
                      {post.caption && (
                        <p className="mt-1 text-sm leading-snug text-white line-clamp-3">
                          {truncarLegenda(post.caption)}
                        </p>
                      )}
                      <span className="mt-2 inline-block text-xs font-bold text-white underline underline-offset-2">
                        Ver no Instagram
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Botão para visitar o Instagram completo */}
        {posts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/fabianozaffalon.cia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#006EB7] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00497F]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
              Ver perfil completo no Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
