-- CreateTable
CREATE TABLE "JornadaStepProgress" (
    "id" SERIAL NOT NULL,
    "id_mei" INTEGER NOT NULL,
    "step" TEXT NOT NULL,
    "started" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JornadaStepProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JornadaChecklistItem" (
    "id" SERIAL NOT NULL,
    "id_mei" INTEGER NOT NULL,
    "step" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "is_checked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JornadaChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JornadaStepProgress_id_mei_step_key" ON "JornadaStepProgress"("id_mei", "step");

-- CreateIndex
CREATE UNIQUE INDEX "JornadaChecklistItem_id_mei_step_item_id_key" ON "JornadaChecklistItem"("id_mei", "step", "item_id");

-- AddForeignKey
ALTER TABLE "JornadaStepProgress" ADD CONSTRAINT "JornadaStepProgress_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaChecklistItem" ADD CONSTRAINT "JornadaChecklistItem_id_mei_fkey" FOREIGN KEY ("id_mei") REFERENCES "Mei"("id_mei") ON DELETE RESTRICT ON UPDATE CASCADE;
