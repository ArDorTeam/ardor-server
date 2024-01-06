
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max } from 'class-validator';
import { MAX_OFFSET, MIN_OFFSET, MAX_LENGTH } from '../contants/paginate.contant';
import { ApiProperty } from '@nestjs/swagger';
export class PaginateDto {
  @ApiProperty({ description: "页数", example: 1 })
  @IsNumber()
  @IsOptional()
  @Max(MAX_OFFSET)
  @Type(() => Number)
  readonly offset?: number = MIN_OFFSET;

  @ApiProperty({ description: "条数", example: 20 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  readonly length?: number = MAX_LENGTH;
}