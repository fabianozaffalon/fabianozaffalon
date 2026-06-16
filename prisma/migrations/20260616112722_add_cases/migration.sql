-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tag" TEXT NOT NULL DEFAULT 'Case de Crescimento',
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "conteudo" TEXT NOT NULL,
    "capa" TEXT NOT NULL,
    "galeria" TEXT[],
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "data" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Case_slug_key" ON "Case"("slug");
