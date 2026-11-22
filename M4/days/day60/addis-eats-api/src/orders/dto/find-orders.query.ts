import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, Matches } from 'class-validator';
import { sortPattern, toList } from '../../common/list-query';
import { PageQuery } from '../../common/page-query.dto';
import { ORDER_STATUSES, OrderStatus } from '../order.types';

export const ORDER_SORT_FIELDS = ['id', 'customer', 'totalSantim'] as const;
export const ORDER_FIELDS = ['id', 'customer', 'area', 'status', 'restaurantId', 'totalSantim'] as const;

export class FindOrdersQuery extends PageQuery {
  // replaces GET /orders/pending -> ?status=PENDING   (and ?status=PENDING,PREPARING)
  @ApiPropertyOptional({
    type: String,
    description: `One or more of: ${ORDER_STATUSES.join(', ')}. Comma separated.`,
    example: 'PENDING,PREPARING',
  })
  @IsOptional() @Transform(toList) @IsIn(ORDER_STATUSES, { each: true })
  status?: OrderStatus[];

  // ?area= is NOT here: it is bound with ParseAreaPipe in the controllers (Day 59).

  // ?sort=-totalSantim   ?sort=customer,-totalSantim  (only these 3 fields are sortable)
  @ApiPropertyOptional({
    type: String,
    description: `Fields: ${ORDER_SORT_FIELDS.join(', ')}. A leading minus means descending. Use -id for newest first.`,
    default: 'id',
    example: 'area,-totalSantim',
  })
  @IsOptional() @Transform(toList) @Matches(sortPattern(ORDER_SORT_FIELDS), { each: true })
  sort: string[] = ['id'];

  // ?fields=id,status -> a sparse response
  @ApiPropertyOptional({
    type: String,
    description: `Return only these fields of each order (a smaller response). Any of: ${ORDER_FIELDS.join(', ')}.`,
    example: 'id,status',
  })
  @IsOptional() @Transform(toList) @IsIn(ORDER_FIELDS, { each: true })
  fields?: (typeof ORDER_FIELDS)[number][];
}
