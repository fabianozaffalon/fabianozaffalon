import { ImageResponse } from "next/og";
import { OG_SIZE, OG_CONTENT_TYPE, BrandOgImage } from "@/lib/og";

export const alt = "Fabiano Zaffalon Distribuidora";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(<BrandOgImage />, size);
}
