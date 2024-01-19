import { Module } from '@nestjs/common';
import { TencentCosService } from './tencent-cos.service';
import { TencentCosController } from './tencent-cos.controller';

@Module({
  controllers: [TencentCosController],
  providers: [TencentCosService],
})
export class TencentCosModule {}
