-- AlterTable
ALTER TABLE "Diagnostico" ALTER COLUMN "atualizado_em" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "DocumentosMei" (
    "id_mei" INTEGER NOT NULL,
    "possui_rg" BOOLEAN NOT NULL DEFAULT false,
    "possui_cpf" BOOLEAN NOT NULL DEFAULT false,
    "possui_comprovante_residencia" BOOLEAN NOT NULL DEFAULT false,
    "possui_cartao_cnpj" BOOLEAN NOT NULL DEFAULT false,
    "comunicacao_desenquadramento_social" BOOLEAN NOT NULL DEFAULT false,
    "formulario_capa_marrom" BOOLEAN NOT NULL DEFAULT false,
    "requerimento_desenquadramento" BOOLEAN NOT NULL DEFAULT false,
    "comprovante_pagamento_dare" BOOLEAN NOT NULL DEFAULT false,
    "contrato_social" BOOLEAN NOT NULL DEFAULT false,
    "possui_ccmei" BOOLEAN NOT NULL DEFAULT false,
    "possui_cadesp" BOOLEAN NOT NULL DEFAULT false,
    "comprovante_situacao_simples_nacional" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentosMei_pkey" PRIMARY KEY ("id_mei")
);

-- AddForeignKey
ALTER TABLE "DocumentosMei" ADD CONSTRAINT "DocumentosMei_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
