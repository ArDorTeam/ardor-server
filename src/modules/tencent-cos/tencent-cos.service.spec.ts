import { Test, TestingModule } from '@nestjs/testing';
import { TencentCosService } from './tencent-cos.service';

describe('TencentCosService', () => {
  let service: TencentCosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TencentCosService],
    }).compile();

    service = module.get<TencentCosService>(TencentCosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
