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

async function getInstagramPosts(limit: number): Promise<InstagramPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/instagram`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.posts ?? []).slice(0, limit);
  } catch {
    return [];
  }
}

function truncarLegenda(caption: string | null, max: number = 90): string {
  if (!caption) return "";
  const limpo = caption.replace(/\n+/g, " ").trim();
  return limpo.length > max ? limpo.slice(0, max).trim() + "..." : limpo;
}

export async function InstagramFeed({ limit = 2 }: { limit?: number }) {
  const posts = await getInstagramPosts(limit);

  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {posts.map((post) => {
        const imagem = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver no Instagram: ${truncarLegenda(post.caption, 60) || "publicação sem legenda"}`}
            className="group relative block overflow-hidden rounded-xl"
          >
            <div className="relative w-full aspect-square">
              {imagem && (
                <Image
                  src={imagem}
                  alt={truncarLegenda(post.caption, 60) || "Publicação Instagram"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 280px"
                  unoptimized // CDN do Instagram já otimiza, e URLs expiram
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge Instagram */}
              <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4.5" stroke="#E1306C" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/>
                </svg>
              </div>

              {/* Conteúdo */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {post.caption && (
                  <p className="text-xs leading-snug text-white/90 line-clamp-2">
                    {truncarLegenda(post.caption)}
                  </p>
                )}
                <span className="mt-2 inline-block text-xs font-semibold text-white underline underline-offset-2">
                  Ver no Instagram
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
