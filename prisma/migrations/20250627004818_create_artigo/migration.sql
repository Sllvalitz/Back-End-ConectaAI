-- CreateTable
CREATE TABLE "Artigo" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "imagemUrl" TEXT,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);
