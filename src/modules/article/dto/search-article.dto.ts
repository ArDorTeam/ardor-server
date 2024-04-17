
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray} from 'class-validator';
export class SearchDto {
  @ApiProperty({ description: "搜索值" })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly searchValue?: string = '';

  @ApiProperty({ description: "分类id" })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly categoryId?: string = '';

  @ApiProperty({ description: "创建时间" })
  @IsArray()
  @IsOptional()
  @Type(() => Array)
  readonly createTime?: Array<string> = [];

  @ApiProperty({ description: "更新时间" })
  @IsArray()
  @IsOptional()
  @Type(() => Array)
  readonly updateTime?: Array<string> = [];

}
