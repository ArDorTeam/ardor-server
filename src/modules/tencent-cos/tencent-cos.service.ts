import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as COS from 'cos-nodejs-sdk-v5';
import { encryptFileMD5 } from 'src/utils/cryptogram';

@Injectable()
export class TencentCosService {
    private client: any;

    public constructor(readonly configService: ConfigService) {
        this.client = new COS({
            SecretId: configService.get('SECRET_ID'),
            SecretKey: configService.get('SECRET_KEY')
        })
    }

    public async uploadFile(file) {
        try {
            const buffer = file.data;
            const currentSign = encryptFileMD5(buffer);
            const arr = file.filename.split('.');
            const fileType = arr[arr.length - 1];
            const fileName = currentSign + '.' + fileType

            const datePath = new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })

            const bucket = this.configService.get('BUCKET')
            console.log(`${this.configService.get('RESOURCE_PATH')}${datePath}/${fileName}`)
            const params = {
                Bucket: bucket,
                Region: this.configService.get('REGION'),
                Key: `${this.configService.get('RESOURCE_PATH')}${datePath}/${fileName}`
            }
            const res = await this.client.putObject(Object.assign(params, { Body: buffer }))
            let url = await this.client.getObjectUrl(Object.assign(params, { Sign: false }))
            url = url.replace(new URL(url).host, this.configService.get('STATIC_CDN'))
            return url
        } catch (error) {
            Logger.error(error)
            return ''
        }
    }
}
