import { Test, TestingModule } from '@nestjs/testing';
import { SimuladorRegimesService } from './simulador-regimes.service';

describe('SimuladorRegimesService', () => {
  let service: SimuladorRegimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimuladorRegimesService],
    }).compile();

    service = module.get<SimuladorRegimesService>(SimuladorRegimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
