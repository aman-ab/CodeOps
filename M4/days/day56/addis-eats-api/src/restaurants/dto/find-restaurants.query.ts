import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { PageQuery } from '../../common/page-query.dto';
import { toBoolean } from '../../common/transforms';
import { AREAS } from '../restaurant.types';
import type { Area } from '../restaurant.types';
export const RESTAURANT_SORT_FIELDS = ['name', 'area'] as const;

export class FindRestaurantsQuery extends PageQuery {
  @IsOptional() @IsIn(AREAS)
  area?: Area;

  @IsOptional() @Transform(toBoolean) @IsBoolean()
  isOpen?: boolean;

  @IsOptional() @IsIn(RESTAURANT_SORT_FIELDS)
  sort: (typeof RESTAURANT_SORT_FIELDS)[number] = 'name';
}
