import { Test, TestingModule } from '@nestjs/testing';
import { ReceitawsApiTreinamentoService } from './receitaws-api-treinamento.service';

describe('ReceitawsApiTreinamentoService', () => {
  let service: ReceitawsApiTreinamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceitawsApiTreinamentoService],
    }).compile();

    service = module.get<ReceitawsApiTreinamentoService>(ReceitawsApiTreinamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
