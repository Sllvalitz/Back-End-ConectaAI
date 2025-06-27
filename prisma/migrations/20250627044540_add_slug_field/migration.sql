/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Artigo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Artigo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artigo" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artigo_slug_key" ON "Artigo"("slug");
