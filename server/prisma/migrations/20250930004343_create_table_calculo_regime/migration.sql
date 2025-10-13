-- CreateTable
CREATE TABLE "public"."CalculoRegime" (
    "id_mei" INTEGER NOT NULL,
    "receitas_financeiras" DECIMAL(10,2) NOT NULL,
    "receitas_nao_operacionais" DECIMAL(10,2) NOT NULL,
    "despesas_financeiras" DECIMAL(10,2) NOT NULL,
    "tributos_simples" DECIMAL(10,2) NOT NULL,
    "tributos_lucrop" DECIMAL(10,2) NOT NULL,
    "atualizado_em" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "CalculoRegime_pkey" PRIMARY KEY ("id_mei")
);

-- AddForeignKey
ALTER TABLE "public"."CalculoRegime" ADD CONSTRAINT "CalculoRegime_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
