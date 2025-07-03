import { Test, TestingModule } from '@nestjs/testing';
import { ReceitawsApiService } from './receitaws-api.service';

describe('ReceitawsApiService', () => {
  let service: ReceitawsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceitawsApiService],
    }).compile();

    service = module.get<ReceitawsApiService>(ReceitawsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
