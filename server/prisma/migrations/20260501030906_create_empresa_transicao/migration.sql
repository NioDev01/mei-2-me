-- CreateTable
CREATE TABLE "EmpresaTransicao" (
    "id" SERIAL NOT NULL,
    "id_mei" INTEGER NOT NULL,
    "natureza_juridica" TEXT NOT NULL,
    "capital_social" DECIMAL(12,2) NOT NULL,
    "titular_nome" TEXT NOT NULL,
    "titular_cpf" TEXT NOT NULL,
    "socios" JSONB,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmpresaTransicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpresaTransicao_id_mei_key" ON "EmpresaTransicao"("id_mei");

-- AddForeignKey
ALTER TABLE "EmpresaTransicao" ADD CONSTRAINT "EmpresaTransicao_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
