import { Test, TestingModule } from '@nestjs/testing';
import { TencentCosController } from './tencent-cos.controller';
import { TencentCosService } from './tencent-cos.service';

describe('TencentCosController', () => {
  let controller: TencentCosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TencentCosController],
      providers: [TencentCosService],
    }).compile();

    controller = module.get<TencentCosController>(TencentCosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
