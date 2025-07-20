import { Test, TestingModule } from '@nestjs/testing';
import { AnaliseMigracaoService } from './analise-migracao.service';

describe('AnaliseMigracaoService', () => {
  let service: AnaliseMigracaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnaliseMigracaoService],
    }).compile();

    service = module.get<AnaliseMigracaoService>(AnaliseMigracaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
