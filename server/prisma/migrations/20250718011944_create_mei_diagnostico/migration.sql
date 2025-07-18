/*
  Warnings:

  - You are about to drop the `DiagnosticoInicial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DiagnosticoInicial";

-- CreateTable
CREATE TABLE "Mei" (
    "id_mei" SERIAL NOT NULL,
    "nome_mei" TEXT NOT NULL,
    "email_mei" TEXT NOT NULL,
    "senha_mei" TEXT NOT NULL,
    "cnpj_mei" TEXT NOT NULL,
    "numero_celular" TEXT NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL,
    "uf_mei" CHAR(2) NOT NULL,
    "razao_social" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "municipio_mei" TEXT NOT NULL,
    "cnae_principal" CHAR(9) NOT NULL,
    "cnaes_secundarios" TEXT NOT NULL,
    "natureza_juridica" TEXT NOT NULL,

    CONSTRAINT "Mei_pkey" PRIMARY KEY ("id_mei")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "id_diag" SERIAL NOT NULL,
    "id_mei" INTEGER NOT NULL,
    "qtd_funcionarios" INTEGER NOT NULL,
    "paga_acima_piso" BOOLEAN NOT NULL,
    "socio_outra_empresa" BOOLEAN NOT NULL,
    "importa_mercadoria" BOOLEAN NOT NULL,
    "faturamento_12m" INTEGER NOT NULL,
    "compras_12m" INTEGER NOT NULL,
    "resultado_diag" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id_diag")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mei_email_mei_key" ON "Mei"("email_mei");

-- CreateIndex
CREATE UNIQUE INDEX "Mei_cnpj_mei_key" ON "Mei"("cnpj_mei");

-- CreateIndex
CREATE UNIQUE INDEX "Diagnostico_id_mei_key" ON "Diagnostico"("id_mei");

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
