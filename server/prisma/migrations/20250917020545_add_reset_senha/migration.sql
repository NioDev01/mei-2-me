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

-- CreateIndex
CREATE UNIQUE INDEX "ResetSenha_token_key" ON "public"."ResetSenha"("token");

-- AddForeignKey
ALTER TABLE "public"."ResetSenha" ADD CONSTRAINT "ResetSenha_userId_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
