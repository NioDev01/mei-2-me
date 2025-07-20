/*
  Warnings:

  - The primary key for the `Cnae` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Cnae" DROP CONSTRAINT "Cnae_pkey",
ADD COLUMN     "id_cnae" SERIAL NOT NULL,
ADD CONSTRAINT "Cnae_pkey" PRIMARY KEY ("id_cnae");
