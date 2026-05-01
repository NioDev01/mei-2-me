import { Test, TestingModule } from '@nestjs/testing';
import { AtoConstitutivoController } from './ato-constitutivo.controller';
import { AtoConstitutivoService } from './ato-constitutivo.service';

describe('AtoConstitutivoController', () => {
  let controller: AtoConstitutivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtoConstitutivoController],
      providers: [AtoConstitutivoService],
    }).compile();

    controller = module.get<AtoConstitutivoController>(AtoConstitutivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
