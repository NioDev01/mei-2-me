-- CreateTable
CREATE TABLE "public"."DocumentosMei" (
    "id_mei" INTEGER NOT NULL,
    "possui_rg" BOOLEAN NOT NULL DEFAULT false,
    "possui_cpf" BOOLEAN NOT NULL DEFAULT false,
    "possui_cnh" BOOLEAN NOT NULL DEFAULT false,
    "possui_ccmei" BOOLEAN NOT NULL DEFAULT false,
    "possui_cartao_cnpj" BOOLEAN NOT NULL DEFAULT false,
    "possui_insc_estadual" BOOLEAN NOT NULL DEFAULT false,
    "possui_insc_municipal" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentosMei_pkey" PRIMARY KEY ("id_mei")
);

-- AddForeignKey
ALTER TABLE "public"."DocumentosMei" ADD CONSTRAINT "DocumentosMei_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "public"."Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
