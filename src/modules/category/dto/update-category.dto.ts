import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateCategoryDto {

  @IsNotEmpty({message: '类别id不能为空'})
  @IsString()
  readonly type_id: string;

  @IsNotEmpty({message: '标题不能为空'})
  @IsString()
  readonly title: string;


}
