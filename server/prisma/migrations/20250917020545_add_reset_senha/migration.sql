-- CreateTable
CREATE TABLE "public"."ResetSenha" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetSenha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetSenha_token_key" ON "public"."ResetSenha"("token");

-- AddForeignKey
ALTER TABLE "public"."ResetSenha" ADD CONSTRAINT "ResetSenha_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
