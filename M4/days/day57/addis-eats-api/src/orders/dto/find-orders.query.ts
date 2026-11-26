import { Transform } from 'class-transformer';
import { IsIn, IsOptional, Matches } from 'class-validator';
import { sortPattern, toList } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';
import { AREAS, Area } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES, OrderStatus } from '../order.types';

export const ORDER_SORT_FIELDS = ['id', 'customer', 'totalSantim'] as const;
export const ORDER_FIELDS = ['id', 'customer', 'area', 'status', 'restaurantId', 'totalSantim'] as const;

export class FindOrdersQuery extends PageQuery {
  // replaces GET /orders/pending -> ?status=PENDING   (and ?status=PENDING,PREPARING)
  @IsOptional() @Transform(toList) @IsIn(ORDER_STATUSES, { each: true })
  status?: OrderStatus[];

  @IsOptional() @Transform(toList) @IsIn(AREAS, { each: true })
  area?: Area[];

  // ?sort=-totalSantim   ?sort=customer,-totalSantim  (only these 3 fields are sortable)
  @IsOptional() @Transform(toList) @Matches(sortPattern(ORDER_SORT_FIELDS), { each: true })
  sort: string[] = ['id'];

  // ?fields=id,status -> a sparse response
  @IsOptional() @Transform(toList) @IsIn(ORDER_FIELDS, { each: true })
  fields?: (typeof ORDER_FIELDS)[number][];
}
