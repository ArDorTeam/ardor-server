import { IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}