import { Test, TestingModule } from '@nestjs/testing';
import { AtoConstitutivoService } from './ato-constitutivo.service';

describe('AtoConstitutivoService', () => {
  let service: AtoConstitutivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtoConstitutivoService],
    }).compile();

    service = module.get<AtoConstitutivoService>(AtoConstitutivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
