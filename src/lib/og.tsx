export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BRAND_BLUE = "#00497F";
const ACCENT_BLUE = "#006EB7";

export function BrandOgImage({ title }: { title?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        backgroundColor: BRAND_BLUE,
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {title ?? "Fabiano Zaffalon Distribuidora"}
      </div>
      <div style={{ width: 120, height: 6, backgroundColor: ACCENT_BLUE, borderRadius: 3 }} />
      <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)", textAlign: "center" }}>
        Soluções em Distribuição
      </div>
    </div>
  );
}

export function ArticleOgImage({ title, imageUrl }: { title: string; imageUrl?: string | null }) {
  if (!imageUrl) return <BrandOgImage title={title} />;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: BRAND_BLUE,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        width={OG_SIZE.width}
        height={OG_SIZE.height}
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,73,127,0) 40%, rgba(0,73,127,0.92) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ width: 80, height: 6, backgroundColor: ACCENT_BLUE, borderRadius: 3 }} />
        <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>{title}</div>
      </div>
    </div>
  );
}
