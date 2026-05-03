/*
  Warnings:

  - You are about to drop the column `contrato_social` on the `DocumentosMei` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DocumentosMei" DROP COLUMN "contrato_social",
ADD COLUMN     "ato_constitutivo" BOOLEAN NOT NULL DEFAULT false;
