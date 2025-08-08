import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoInicialTreinamentoService } from './diagnostico-inicial-treinamento.service';

describe('DiagnosticoInicialTreinamentoService', () => {
  let service: DiagnosticoInicialTreinamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticoInicialTreinamentoService],
    }).compile();

    service = module.get<DiagnosticoInicialTreinamentoService>(DiagnosticoInicialTreinamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
