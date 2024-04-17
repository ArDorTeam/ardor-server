import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({message: '标题不能为空'})
  @IsString()
  title: string;
}
