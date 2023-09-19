import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty({message: '用户id不能为空'})
  @IsString()
  readonly user_id: string;
}