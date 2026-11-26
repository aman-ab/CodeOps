import { Area } from '../restaurants/restaurant.types';

export const ORDER_STATUSES = [
  'PENDING',
  'PREPARING',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderLine {
  dishId: number;
  quantity: number;
}

export interface Order {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  lines: OrderLine[];      // Day 58
  tipSantim?: number;      // Day 58: chosen by the client
  phone?: string;          // Day 58: TeleBirr number
  totalSantim: number;     // computed by the SERVER, never sent by the client
}
