import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";

// Poppins — carrega só os pesos usados no projeto
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"], // ← adiciona 500, 600, 700
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
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <Analytics />
        {/* Skip to main content — acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded"
        >
          Ir ao conteúdo principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
