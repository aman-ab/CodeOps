import { IsIn, IsOptional } from 'class-validator';
import { PageQuery } from '../../common/page-query.dto';
import { AREAS} from '../../restaurants/restaurant.types';
import type {  Area } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES } from '../order.types';
import type {OrderStatus} from '../order.types';
export const ORDER_SORT_FIELDS = ['id', 'customer', 'totalSantim'] as const;

export class FindOrdersQuery extends PageQuery {
  @IsOptional() @IsIn(ORDER_STATUSES)
  status?: OrderStatus;

  @IsOptional() @IsIn(AREAS)
  area?: Area;

  @IsOptional() @IsIn(ORDER_SORT_FIELDS)
  sort: (typeof ORDER_SORT_FIELDS)[number] = 'id';
}
