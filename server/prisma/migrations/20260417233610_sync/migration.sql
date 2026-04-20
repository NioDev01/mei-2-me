/*
  Warnings:

  - You are about to drop the `DocumentosMei` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentosMei" DROP CONSTRAINT "DocumentosMei_id_mei_fkey";

-- DropTable
DROP TABLE "DocumentosMei";
