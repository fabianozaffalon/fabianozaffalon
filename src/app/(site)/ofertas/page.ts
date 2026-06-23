// src/app/(site)/ofertas/page.tsx — substitui a query existente
// Filtra ofertas ativas E (sem validade definida OU com validade futura)

const agora = new Date();

const ofertas = await prisma.oferta.findMany({
  where: {
    ativo: true,
    OR: [
      { validade: null },
      { validade: { gt: agora } },
    ],
  },
  orderBy: { createdAt: "desc" },
});
