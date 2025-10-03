/*
  Warnings:

  - Added the required column `aliq_efetiva_lucrop` to the `CalculoRegime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aliq_efetiva_simples` to the `CalculoRegime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lucro_liq_lucrop` to the `CalculoRegime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lucro_liq_simples` to the `CalculoRegime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CalculoRegime" ADD COLUMN     "aliq_efetiva_lucrop" DECIMAL(3,2) NOT NULL,
ADD COLUMN     "aliq_efetiva_simples" DECIMAL(3,2) NOT NULL,
ADD COLUMN     "lucro_liq_lucrop" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "lucro_liq_simples" DECIMAL(10,2) NOT NULL;
