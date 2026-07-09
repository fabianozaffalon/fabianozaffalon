import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Raw SQL para não disparar @updatedAt (prisma.update() bumparia updatedAt
// em cada notícia, afetando o lastModified no sitemap sem necessidade).
const count = await prisma.$executeRaw`
  UPDATE "Noticia" SET "publishedAt" = "createdAt"
`;

console.log(`Backfill concluído: ${count} notícia(s) atualizada(s).`);

await prisma.$disconnect();
