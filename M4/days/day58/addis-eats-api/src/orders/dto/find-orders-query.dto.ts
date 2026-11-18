import { IsOptional, IsIn, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import type { Area, OrderStatus } from '../order.types';
import { AREAS } from '../order.types';

export class FindOrdersQueryDto {
  @IsOptional()
  @IsIn(['PENDING', 'PREPARING', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED'])
  status?: OrderStatus;

  @IsOptional()
  @IsIn(AREAS)
  area?: Area;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10; // Has a default, so no ! needed

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0; // Has a default, so no ! needed

  @IsOptional()
  @IsString()
  @IsIn(['id', 'customer', 'area', 'status'])
  sort: string = 'id'; // Has a default, so no ! needed
}
