import { IsIn } from 'class-validator';
import { ORDER_STATUSES, type OrderStatus } from '../order.types';

export class UpdateStatusDto {
  @IsIn(ORDER_STATUSES)
  status!: OrderStatus;
}
