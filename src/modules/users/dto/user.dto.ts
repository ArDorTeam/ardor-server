import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty({message: '邮箱不能为空'})
  @IsString()
  email: string;
}