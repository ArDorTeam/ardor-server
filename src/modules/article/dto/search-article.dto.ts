
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray} from 'class-validator';
export class SearchDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly searchValue?: string = '';

  @IsArray()
  @IsOptional()
  @Type(() => Array)
  readonly createTime?: Array<string> = [];

  @IsArray()
  @IsOptional()
  @Type(() => Array)
  readonly updateTime?: Array<string> = [];

}