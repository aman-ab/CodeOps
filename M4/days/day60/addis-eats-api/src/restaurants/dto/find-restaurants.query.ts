import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, Matches } from 'class-validator';
import { toList, sortPattern } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';
import { toBoolean } from '../../common/transforms';

export const RESTAURANT_SORT_FIELDS = ['name', 'area'] as const;

export class FindRestaurantsQuery extends PageQuery {
  // ?area= is NOT here: it is bound with ParseAreaPipe in the controller (Day 59).

  // replaces GET /restaurants/open  ->  ?isOpen=true
  /** `true` for open restaurants only, `false` for closed ones. Omit for all. */
  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional() @Transform(toBoolean) @IsBoolean()
  isOpen?: boolean;

  // ?sort=name  ?sort=-name  ?sort=area,-name
  // On the wire this is ONE comma separated string, although the TypeScript type is an array.
  @ApiPropertyOptional({
    type: String,
    description: `Fields: ${RESTAURANT_SORT_FIELDS.join(', ')}. A leading minus means descending. First key wins ties.`,
    default: 'name',
    example: 'area,-name',
  })
  @IsOptional() @Transform(toList) @Matches(sortPattern(RESTAURANT_SORT_FIELDS), { each: true })
  sort: string[] = ['name'];
}
