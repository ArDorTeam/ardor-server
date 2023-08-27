import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({message: '标题不能为空'})
  @IsString()
  readonly title: string;

  @IsNotEmpty({message: '摘要不能为空'})
  @IsString()
  readonly sub_title: string;

  @IsNotEmpty({message: '文章封面图不能为空'})
  @IsString()
  readonly cover_url: string;

  @IsNotEmpty({message: '文章内容不能为空'})
  @IsString()
  readonly content: string;

  @IsNotEmpty({message: '文章是否置顶不能为空'})
  @IsBoolean({message: '文章是否置顶必须是布尔值'})
  readonly is_recommend: boolean;
}