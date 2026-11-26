import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

// Shared by every list endpoint. Defaults live HERE, @Max is the defence.
export class PageQuery {
  @IsOptional() @Type(() => Number)
  @IsInt() @Min(1) @Max(50)
  limit: number = 20;

  @IsOptional() @Type(() => Number)
  @IsInt() @Min(0)
  offset: number = 0;
}
