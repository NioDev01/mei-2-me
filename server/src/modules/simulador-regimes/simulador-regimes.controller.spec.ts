import { Test, TestingModule } from '@nestjs/testing';
import { SimuladorRegimesController } from './simulador-regimes.controller';
import { SimuladorRegimesService } from './simulador-regimes.service';

describe('SimuladorRegimesController', () => {
  let controller: SimuladorRegimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimuladorRegimesController],
      providers: [SimuladorRegimesService],
    }).compile();

    controller = module.get<SimuladorRegimesController>(
      SimuladorRegimesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
