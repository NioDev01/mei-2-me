/*
  Warnings:

  - You are about to drop the column `comunicacao_desenquadramento_social` on the `DocumentosMei` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DocumentosMei" DROP COLUMN "comunicacao_desenquadramento_social",
ADD COLUMN     "comunicacao_desenquadramento_simei" BOOLEAN NOT NULL DEFAULT false;
