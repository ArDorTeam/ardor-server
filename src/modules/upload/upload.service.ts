import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { join } from 'path/posix'
import {createWriteStream, readFileSync} from 'fs'

@Injectable()
export class UploadService {
  async uploadFile(file) {
    let time = new Date().getTime();
    let filename = time+"_"+file['image'][0].filename;
    let data = file['image'][0].data
    //let encoding = multipart['editormd-image-file'][0].encoding

//文件上传路径
    let path = join(__dirname, '../../../uploadFile/');

    const writerStream = createWriteStream(
        path + filename
    );
    writerStream.write(data);
    await writerStream.end();
    return filename
}

async sendFile(fileName, res) {
    const stream = readFileSync(`../../uploadFile/${fileName}`)
    return res.type('text/html').send(stream)
}
}
