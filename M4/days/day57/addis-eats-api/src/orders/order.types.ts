import { Area } from '../restaurants/restaurant.types';

// as const array => ONE list for the type AND the validators
export const ORDER_STATUSES = [
  'PENDING',
  'PREPARING',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Order {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  totalSantim: number;
}
