import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

// Shared by every list endpoint. Defaults live HERE, @Max is the defence.
export class PageQuery {
  /** Page size. */
  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 20, example: 20 })
  @IsOptional() @Type(() => Number)
  @IsInt() @Min(1) @Max(50)
  limit: number = 20;

  /** How many records to skip. */
  @ApiPropertyOptional({ minimum: 0, default: 0, example: 0 })
  @IsOptional() @Type(() => Number)
  @IsInt() @Min(0)
  offset: number = 0;
}
