import { IsNotEmpty, IsString } from 'class-validator';

export class getArticleDetailDto {
  @IsNotEmpty({message: '文章id不能为空'})
  @IsString()
  readonly article_id: string;
}