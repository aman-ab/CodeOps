import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AREAS, type Area } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES, type OrderStatus } from '../order.types';
import { OrderLineDto } from './order-line.dto';

export class OrderDto {
  @ApiProperty({ description: 'Assigned by the server.', example: 15 })
  id!: number;

  @ApiProperty({ example: 'Almaz Bekele' })
  customer!: string;

  @ApiProperty({ enum: AREAS, example: 'Bole' })
  area!: Area;

  @ApiProperty({ enum: ORDER_STATUSES, description: 'Every new order starts as PENDING.', example: 'PENDING' })
  status!: OrderStatus;

  @ApiProperty({ example: 1 })
  restaurantId!: number;

  @ApiProperty({ type: [OrderLineDto] })
  lines!: OrderLineDto[];

  @ApiPropertyOptional({ description: 'Whole santim.', example: 5000 })
  tipSantim?: number;

  @ApiPropertyOptional({ description: 'TeleBirr number.', example: '0912345678' })
  phone?: string;

  @ApiProperty({
    description: 'Whole santim. 69000 is 690.00 ETB. Computed by the server: dish price x quantity for every line, plus the tip. A request that tries to send it is rejected (400).',
    example: 69000,
  })
  totalSantim!: number;
}

export class PagedOrderDto {
  @ApiProperty({ type: [OrderDto], description: 'With ?fields= each item holds only those fields.' })
  items!: OrderDto[];

  @ApiProperty({ description: 'Matches BEFORE paging.', example: 14 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}
