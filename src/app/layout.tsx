import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

// Poppins — carrega só os pesos usados no projeto
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fabianozaffalon.com.br"),
  title: {
    default: "Fabiano Zaffalon Distribuidora | Soluções em Distribuição",
    template: "%s | Fabiano Zaffalon",
  },
  description:
    "Distribuidora consolidada no mercado, com amplo portfólio de produtos das melhores marcas. Soluções para varejo, food service e indústria.",
  keywords: [
    "distribuidora",
    "food service",
    "indústria",
    "Suzano",
    "BIC",
    "Havaianas",
    "Yoki",
    "Piraquê",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fabiano Zaffalon Distribuidora",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
