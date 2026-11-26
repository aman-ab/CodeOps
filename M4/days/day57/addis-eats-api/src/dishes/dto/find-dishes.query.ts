import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Matches, Min } from 'class-validator';
import { sortPattern, toList } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';

export const DISH_SORT_FIELDS = ['id', 'name', 'priceSantim'] as const;

export class FindDishesQuery extends PageQuery {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  restaurantId?: number;

  // ?sort=-priceSantim  ?sort=name,-priceSantim
  @IsOptional() @Transform(toList) @Matches(sortPattern(DISH_SORT_FIELDS), { each: true })
  sort: string[] = ['id'];
}
