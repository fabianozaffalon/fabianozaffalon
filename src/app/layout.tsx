import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { SITE_URL } from "@/lib/seo";

const LOGO_URL = `${SITE_URL}/images/logo.png`;

// Poppins — carrega só os pesos usados no projeto
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const DEFAULT_TITLE = "Fabiano Zaffalon Distribuidora | Soluções em Distribuição";
const DEFAULT_DESCRIPTION =
  "Distribuidora consolidada no mercado, com amplo portfólio de produtos das melhores marcas. Soluções para varejo, food service e indústria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Fabiano Zaffalon",
  },
  description: DEFAULT_DESCRIPTION,
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
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fabiano Zaffalon Distribuidora",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fabiano Zaffalon Distribuidora",
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: [
    "https://www.instagram.com/fabianozaffalon.cia/",
    "https://www.linkedin.com/company/distribuidora-fabiano-zaffalon/",
    "https://www.facebook.com/fabianozaffalon.cia/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable} data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
