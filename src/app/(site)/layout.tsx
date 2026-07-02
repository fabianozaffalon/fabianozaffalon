import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { WhatsAppButton } from "@/components/sections/Hero";
import { ConsultorModalProvider } from "@/components/sections/ConsultorModal";
import { UnidadesModalProvider } from "@/components/sections/UnidadesModal";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      {/* Skip to main content — acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded"
      >
        Ir ao conteúdo principal
      </a>
      <ConsultorModalProvider>
        <UnidadesModalProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </UnidadesModalProvider>
      </ConsultorModalProvider>
    </>
  );
}
