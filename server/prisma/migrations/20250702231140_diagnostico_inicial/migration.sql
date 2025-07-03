-- CreateTable
CREATE TABLE "DiagnosticoInicial" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "uf" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "dataAbertura" TEXT NOT NULL,
    "atividadePrincipal" JSONB NOT NULL,
    "atividadesSecundarias" JSONB,
    "naturezaJuridica" TEXT NOT NULL,

    CONSTRAINT "DiagnosticoInicial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosticoInicial_cnpj_key" ON "DiagnosticoInicial"("cnpj");
