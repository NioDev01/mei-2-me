import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoInicialController } from './diagnostico-inicial.controller';
import { DiagnosticoInicialService } from './diagnostico-inicial.service';

describe('DiagnosticoInicialController', () => {
  let controller: DiagnosticoInicialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoInicialController],
      providers: [DiagnosticoInicialService],
    }).compile();

    controller = module.get<DiagnosticoInicialController>(DiagnosticoInicialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
