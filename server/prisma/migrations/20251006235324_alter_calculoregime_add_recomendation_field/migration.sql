/*
  Warnings:

  - Added the required column `recomendacao` to the `CalculoRegime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CalculoRegime" ADD COLUMN     "recomendacao" CHAR(2) NOT NULL;
