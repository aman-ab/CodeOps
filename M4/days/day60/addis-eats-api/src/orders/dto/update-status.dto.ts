import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ORDER_STATUSES, type OrderStatus } from '../order.types';

export class UpdateStatusDto {
  /**
   * The status to move to. Allowed: PENDING to PREPARING or CANCELLED; PREPARING to ON_THE_WAY or
   * CANCELLED; ON_THE_WAY to DELIVERED. DELIVERED and CANCELLED are final.
   */
  @ApiProperty({ enum: ORDER_STATUSES, example: 'PREPARING' })
  @IsIn(ORDER_STATUSES)
  status!: OrderStatus;
}
