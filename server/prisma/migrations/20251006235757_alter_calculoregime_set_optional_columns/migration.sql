-- AlterTable
ALTER TABLE "public"."CalculoRegime" ALTER COLUMN "receitas_financeiras" DROP NOT NULL,
ALTER COLUMN "receitas_nao_operacionais" DROP NOT NULL,
ALTER COLUMN "despesas_financeiras" DROP NOT NULL;
