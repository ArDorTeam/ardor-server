import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty({message: '类别id不能为空'})
  @IsString()
  readonly type_id: string;
}
