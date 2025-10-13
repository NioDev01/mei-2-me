/*
  Warnings:

  - A unique constraint covering the columns `[celular_user]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuario_celular_user_key" ON "public"."Usuario"("celular_user");

-- CreateIndex
CREATE INDEX "Usuario_email_user_idx" ON "public"."Usuario"("email_user");

-- CreateIndex
CREATE INDEX "Usuario_celular_user_idx" ON "public"."Usuario"("celular_user");

-- CreateIndex
CREATE INDEX "Usuario_cnpj_user_idx" ON "public"."Usuario"("cnpj_user");

-- RenameForeignKey
ALTER TABLE "public"."ResetSenha" RENAME CONSTRAINT "ResetSenha_userId_fkey" TO "ResetSenha_id_user_fkey";
