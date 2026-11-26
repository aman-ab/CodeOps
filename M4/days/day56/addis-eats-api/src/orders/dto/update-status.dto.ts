import { IsIn } from 'class-validator';
import { ORDER_STATUSES } from '../order.types';
import type {OrderStatus } from '../order.types';
export class UpdateStatusDto {
  @IsIn(ORDER_STATUSES)
  status!: OrderStatus;
}
