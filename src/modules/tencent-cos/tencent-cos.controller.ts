import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TencentCosService } from './tencent-cos.service';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';

@ApiTags('腾讯云COS模块')
@Controller('tencent-cos')
export class TencentCosController {
  constructor(private readonly tencentCosService: TencentCosService) {}

  @Public()
  @Post('upload')
  @ApiOkResponse({description:'文件上传'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async upload(@Body() body) {
    const file = body.file[0]
    if(!file) throw new BadRequestException('文件不能为空')
    return this.tencentCosService.uploadFile(file)
  }
}
