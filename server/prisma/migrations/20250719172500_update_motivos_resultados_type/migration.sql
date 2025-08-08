/*
  Warnings:

  - Changed the type of `motivos_resultado` on the `Diagnostico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Diagnostico" DROP COLUMN "motivos_resultado",
ADD COLUMN     "motivos_resultado" JSONB NOT NULL;
