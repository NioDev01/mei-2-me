import { Module } from '@nestjs/common';
import { ChecklistDocumentosService } from './checklist-documentos.service';
import { ChecklistDocumentosController } from './checklist-documentos.controller';

@Module({
  controllers: [ChecklistDocumentosController],
  providers: [ChecklistDocumentosService],
})
export class ChecklistDocumentosModule {}
