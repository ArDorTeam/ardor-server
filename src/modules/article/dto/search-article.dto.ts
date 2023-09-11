
import { Type } from 'class-transformer';
import { IsString, IsOptional} from 'class-validator';
export class SearchDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly searchValue?: string = '';

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly createTime?: string = '';

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly updateTime?: string = '';

}