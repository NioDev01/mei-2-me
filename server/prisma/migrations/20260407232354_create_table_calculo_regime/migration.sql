-- CreateTable
CREATE TABLE "CalculoRegime" (
    "id_mei" INTEGER NOT NULL,
    "receitas_financeiras" DECIMAL(12,2) DEFAULT 0.00,
    "receitas_nao_operacionais" DECIMAL(12,2) DEFAULT 0.00,
    "despesas_financeiras" DECIMAL(12,2) DEFAULT 0.00,
    "tributos_simples" DECIMAL(12,2) NOT NULL,
    "tributos_lucrop" DECIMAL(12,2) NOT NULL,
    "atualizado_em" TIMESTAMP(0) NOT NULL,
    "aliq_efetiva_lucrop" DECIMAL(5,4) NOT NULL,
    "aliq_efetiva_simples" DECIMAL(5,4) NOT NULL,
    "lucro_liq_lucrop" DECIMAL(12,2) NOT NULL,
    "lucro_liq_simples" DECIMAL(12,2) NOT NULL,
    "recomendacao" CHAR(2) NOT NULL,

    CONSTRAINT "CalculoRegime_pkey" PRIMARY KEY ("id_mei")
);

-- AddForeignKey
ALTER TABLE "CalculoRegime" ADD CONSTRAINT "CalculoRegime_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
