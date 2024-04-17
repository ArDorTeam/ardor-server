import { Controller, Post, Body} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadDto } from './dto'
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
// import { FastifyFileInterceptor } from 'src/common/interceptors/files.interceptor'
// import { Keep } from 'src/common/decorators/keep.decorator';

@ApiTags('upload')
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post('/upload')
    async upload(@Body() body:UploadDto) {
        return this.uploadService.uploadFile(body)
    }

  // @Get(':filePath')
  // @Keep()
  // @Render('1693735473127_me9q9ra1ao.png')
  // async getFile(@Param("filePath") file, @Res() res) {
  //     return this.uploadService.readFile(file, res)
  // }
}
