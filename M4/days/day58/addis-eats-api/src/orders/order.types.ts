export const AREAS = ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'] as const;
export type Area = (typeof AREAS)[number];

export type OrderStatus =
  'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export type Dish = {
  name: string;
  priceSantim: number;
};

export type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
};
