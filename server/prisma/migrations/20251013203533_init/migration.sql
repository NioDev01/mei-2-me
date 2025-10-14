-- CreateTable
CREATE TABLE "public"."Mensagem" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mei" (
    "id_mei" SERIAL NOT NULL,
    "cnpj_mei" VARCHAR(18) NOT NULL,
    "data_abertura" DATE NOT NULL,
    "uf_mei" CHAR(2) NOT NULL,
    "razao_social" VARCHAR(255) NOT NULL,
    "nome_fantasia" VARCHAR(255) NOT NULL,
    "municipio_mei" VARCHAR(255) NOT NULL,
    "cnae_principal" JSONB NOT NULL,
    "cnae_secundario" JSONB,
    "natureza_juridica" VARCHAR(255) NOT NULL,
    "possui_filial" BOOLEAN NOT NULL,
    "qtd_funcionario" INTEGER NOT NULL,
    "paga_acima_piso" BOOLEAN NOT NULL,
    "participa_outra_empresa" BOOLEAN NOT NULL,
    "faturamento_12m" DECIMAL(8,2) NOT NULL,
    "compras_12m" DECIMAL(8,2) NOT NULL,
    "exporta_acima_limite" BOOLEAN NOT NULL,
    "importacao_direta" BOOLEAN NOT NULL,

    CONSTRAINT "Mei_pkey" PRIMARY KEY ("id_mei")
);

-- CreateTable
CREATE TABLE "public"."Diagnostico" (
    "id_mei" INTEGER NOT NULL,
    "resultado_diag" VARCHAR(255) NOT NULL,
    "atualizado_em" TIMESTAMP(0) NOT NULL,
    "motivos_resultado" JSONB NOT NULL,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id_mei")
);

-- CreateTable
CREATE TABLE "public"."Cnae" (
    "cnae" CHAR(9) NOT NULL,
    "ocupacao_cnae" TEXT NOT NULL,
    "descricao_subclasse" TEXT NOT NULL,
    "iss_cnae" CHAR(1) NOT NULL,
    "icms_cnae" CHAR(1) NOT NULL,
    "id_cnae" SERIAL NOT NULL,
    "lucrop_aliq_csll" DECIMAL(5,2),
    "lucrop_aliq_irpj" DECIMAL(5,2),
    "setor_cnae" VARCHAR(30),
    "simples_anexo" VARCHAR(40),
    "simples_fatorr" CHAR(1),

    CONSTRAINT "Cnae_pkey" PRIMARY KEY ("id_cnae")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id_user" SERIAL NOT NULL,
    "id_mei" INTEGER NOT NULL,
    "nome_user" TEXT NOT NULL,
    "email_user" TEXT NOT NULL,
    "cnpj_user" VARCHAR(18) NOT NULL,
    "senha_user" TEXT NOT NULL,
    "celular_user" VARCHAR(14) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "public"."ResetSenha" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetSenha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CalculoRegime" (
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

-- CreateTable
CREATE TABLE "public"."DocumentosMei" (
    "id_mei" INTEGER NOT NULL,
    "possui_rg" BOOLEAN NOT NULL DEFAULT false,
    "possui_cpf" BOOLEAN NOT NULL DEFAULT false,
    "possui_comprovante_residencia" BOOLEAN NOT NULL DEFAULT false,
    "possui_cartao_cnpj" BOOLEAN NOT NULL DEFAULT false,
    "comunicacao_desenquadramento_simei" BOOLEAN NOT NULL DEFAULT false,
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

-- CreateIndex
CREATE UNIQUE INDEX "Mei_cnpj_mei_key" ON "public"."Mei"("cnpj_mei");

-- CreateIndex
CREATE INDEX "cnae_cnae_index" ON "public"."Cnae"("cnae");

-- CreateIndex
CREATE INDEX "cnae_cnae_ocupacao_cnae_index" ON "public"."Cnae"("cnae", "ocupacao_cnae");

-- CreateIndex
CREATE INDEX "cnae_cnae_descricao_subclasse_index" ON "public"."Cnae"("cnae", "descricao_subclasse");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_mei_key" ON "public"."Usuario"("id_mei");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_user_key" ON "public"."Usuario"("email_user");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cnpj_user_key" ON "public"."Usuario"("cnpj_user");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_celular_user_key" ON "public"."Usuario"("celular_user");

-- CreateIndex
CREATE INDEX "Usuario_email_user_idx" ON "public"."Usuario"("email_user");

-- CreateIndex
CREATE INDEX "Usuario_celular_user_idx" ON "public"."Usuario"("celular_user");

-- CreateIndex
CREATE INDEX "Usuario_cnpj_user_idx" ON "public"."Usuario"("cnpj_user");

-- CreateIndex
CREATE UNIQUE INDEX "ResetSenha_token_key" ON "public"."ResetSenha"("token");

-- AddForeignKey
ALTER TABLE "public"."Diagnostico" ADD CONSTRAINT "Diagnostico_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResetSenha" ADD CONSTRAINT "ResetSenha_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CalculoRegime" ADD CONSTRAINT "CalculoRegime_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentosMei" ADD CONSTRAINT "DocumentosMei_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
