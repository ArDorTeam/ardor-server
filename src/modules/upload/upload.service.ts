import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path/posix'
import {createWriteStream, readFileSync} from 'fs'
import { fileUrl } from 'src/common/contants/file.contant'

@Injectable()
export class UploadService {
  async uploadFile(file) {
    let time = new Date().getTime();
    let filename = time+"_"+file['file'][0].filename;
    let data = file['file'][0].data
    //let encoding = multipart['editormd-image-file'][0].encoding
    //文件上传路径
    let path = join(__dirname, '../../../../ardor-file/');
    const writerStream = createWriteStream(
        path + filename
    );
    writerStream.write(data);
    await writerStream.end();
    return fileUrl + filename
  }

    async readFile(fileName, res) {
        let path = join(__dirname, `../../../../ardor-file/${fileName}`);
        const stream = readFileSync(path)
        return res.send(stream)
    }
}
