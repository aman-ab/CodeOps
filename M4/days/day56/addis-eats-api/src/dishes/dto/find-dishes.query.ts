import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { PageQuery } from '../../common/page-query.dto';

export const DISH_SORT_FIELDS = ['id', 'name', 'priceSantim'] as const;

export class FindDishesQuery extends PageQuery {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  restaurantId?: number;

  @IsOptional() @IsIn(DISH_SORT_FIELDS)
  sort: (typeof DISH_SORT_FIELDS)[number] = 'id';
}
