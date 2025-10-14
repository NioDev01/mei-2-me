import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistDocumentosService } from './checklist-documentos.service';

describe('ChecklistDocumentosService', () => {
  let service: ChecklistDocumentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistDocumentosService],
    }).compile();

    service = module.get<ChecklistDocumentosService>(ChecklistDocumentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
