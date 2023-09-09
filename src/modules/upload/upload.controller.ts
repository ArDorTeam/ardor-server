import { Controller, Get, Post, Param, Res, Req, Render } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FastifyFileInterceptor } from 'src/common/interceptors/files.interceptor'
import { Keep } from 'src/common/decorators/keep.decorator';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/upload')
    async upload(@Req() req) {
        return this.uploadService.uploadFile(req.body)
    }

  @Get(':filePath')
  @Keep()
  @Render('1693735473127_me9q9ra1ao.png')
  async getFile(@Param("filePath") file, @Res() res) {
      return this.uploadService.readFile(file, res)
  }
}
