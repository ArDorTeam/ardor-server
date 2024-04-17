import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteArticleDto {
  @IsNotEmpty({message: '文章id不能为空'})
  @IsString()
  readonly article_id: string;
}