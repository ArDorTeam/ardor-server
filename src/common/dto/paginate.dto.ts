
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max } from 'class-validator';
import { MAX_OFFSET, MIN_OFFSET, MAX_LENGTH } from '../contants/paginate.contant';
export class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Max(MAX_OFFSET)
  @Type(() => Number)
  readonly offset?: number = MIN_OFFSET;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly length?: number = MAX_LENGTH;
}