import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Matches, Min } from 'class-validator';
import { sortPattern, toList } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';

export const DISH_SORT_FIELDS = ['id', 'name', 'priceSantim'] as const;

export class FindDishesQuery extends PageQuery {
  /** Only dishes of this restaurant. */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  restaurantId?: number;

  // ?sort=-priceSantim  ?sort=name,-priceSantim
  @ApiPropertyOptional({
    type: String,
    description: `Fields: ${DISH_SORT_FIELDS.join(', ')}. A leading minus means descending.`,
    default: 'id',
    example: '-priceSantim',
  })
  @IsOptional() @Transform(toList) @Matches(sortPattern(DISH_SORT_FIELDS), { each: true })
  sort: string[] = ['id'];
}
