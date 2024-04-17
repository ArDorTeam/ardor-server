import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsNotEmpty({message: '文件不能为空'})
  readonly file: string;
}