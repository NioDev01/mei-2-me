import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistDocumentosController } from './checklist-documentos.controller';
import { ChecklistDocumentosService } from './checklist-documentos.service';

describe('ChecklistDocumentosController', () => {
  let controller: ChecklistDocumentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistDocumentosController],
      providers: [ChecklistDocumentosService],
    }).compile();

    controller = module.get<ChecklistDocumentosController>(ChecklistDocumentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
