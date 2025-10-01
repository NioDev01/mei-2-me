-- AlterTable
ALTER TABLE "public"."Cnae" DROP COLUMN IF EXISTS "lucrop_aliquota",
    ADD COLUMN "lucrop_aliq_csll" DECIMAL(5, 2),
    ADD COLUMN "lucrop_aliq_irpj" DECIMAL(5, 2),
    ADD COLUMN "setor_cnae" VARCHAR(30),
    ADD COLUMN "simples_anexo" VARCHAR(40),
    ADD COLUMN "simples_fatorr" CHAR(1);