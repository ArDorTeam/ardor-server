import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({message: '用户id不能为空'})
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly user_avatar: string;

  @IsNotEmpty({message: '用户名不能为空'})
  @IsString()
  readonly user_name: string;

  @IsString()
  readonly mobile: string;

  @IsNotEmpty({message: '邮箱不能为空'})
  @IsString()
  readonly email: string;
}