import { Controller, Get, Post, Param, Res, Req } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FastifyFileInterceptor } from 'src/common/interceptors/files.interceptor'

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/upload')
    async upload(@Req() req) {
        return this.uploadService.uploadFile(req.body)
    }

  @Get(':filePath')
  async getFile(@Param("filePath") file, @Res() res) {
      return this.uploadService.sendFile(file, res)
  }
}
