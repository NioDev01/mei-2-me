import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoInicialTreinamentoController } from './diagnostico-inicial-treinamento.controller';
import { DiagnosticoInicialTreinamentoService } from './diagnostico-inicial-treinamento.service';

describe('DiagnosticoInicialTreinamentoController', () => {
  let controller: DiagnosticoInicialTreinamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoInicialTreinamentoController],
      providers: [DiagnosticoInicialTreinamentoService],
    }).compile();

    controller = module.get<DiagnosticoInicialTreinamentoController>(DiagnosticoInicialTreinamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
