-- AlterTable
ALTER TABLE "public"."CalculoRegime" ALTER COLUMN "receitas_financeiras" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "receitas_nao_operacionais" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "despesas_financeiras" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "tributos_simples" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "tributos_lucrop" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "aliq_efetiva_lucrop" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "aliq_efetiva_simples" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "lucro_liq_lucrop" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "lucro_liq_simples" SET DATA TYPE DECIMAL(12,2);
