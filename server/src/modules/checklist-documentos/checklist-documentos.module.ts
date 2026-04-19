import { Module } from '@nestjs/common';
import { ChecklistDocumentosService } from '@/modules/checklist-documentos/checklist-documentos.service';
import { ChecklistDocumentosController } from '@/modules/checklist-documentos/checklist-documentos.controller';

@Module({
  controllers: [ChecklistDocumentosController],
  providers: [ChecklistDocumentosService],
})
export class ChecklistDocumentosModule {}
