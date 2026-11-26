import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, Matches } from 'class-validator';
import { toList, sortPattern } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';
import { toBoolean } from '../../common/transforms';

export const RESTAURANT_SORT_FIELDS = ['name', 'area'] as const;

export class FindRestaurantsQuery extends PageQuery {
  // ?area= is NOT here: it is bound with ParseAreaPipe in the controller (Day 59).

  // replaces GET /restaurants/open  ->  ?isOpen=true
  @IsOptional() @Transform(toBoolean) @IsBoolean()
  isOpen?: boolean;

  // ?sort=name  ?sort=-name  ?sort=area,-name
  @IsOptional() @Transform(toList) @Matches(sortPattern(RESTAURANT_SORT_FIELDS), { each: true })
  sort: string[] = ['name'];
}
