/*
  Warnings:

  - Added the required column `importacao_direta` to the `Mei` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mei" ADD COLUMN     "importacao_direta" BOOLEAN NOT NULL;
