import { Order } from './order.types';

// (seed orders predate order lines, so lines is empty)
// 14 orders, 4 areas, 5 statuses: page two has different records,
// and a filter that ignores its argument shows up in the count.
export const ORDER_SEED: Order[] = [
  { id: 1,  customer: 'Almaz Bekele',   area: 'Bole',      status: 'PENDING',    restaurantId: 1, lines: [], totalSantim: 24000 },
  { id: 2,  customer: 'Dawit Haile',    area: 'Kazanchis', status: 'PREPARING',  restaurantId: 3, lines: [], totalSantim: 31500 },
  { id: 3,  customer: 'Selam Tesfaye',  area: 'Piassa',    status: 'ON_THE_WAY', restaurantId: 4, lines: [], totalSantim: 18000 },
  { id: 4,  customer: 'Hana Girma',     area: 'Megenagna', status: 'DELIVERED',  restaurantId: 2, lines: [], totalSantim: 45000 },
  { id: 5,  customer: 'Yonas Alemu',    area: 'Bole',      status: 'PENDING',    restaurantId: 2, lines: [], totalSantim: 52000 },
  { id: 6,  customer: 'Meron Assefa',   area: 'Bole',      status: 'DELIVERED',  restaurantId: 1, lines: [], totalSantim: 29000 },
  { id: 7,  customer: 'Abel Tadesse',   area: 'Kazanchis', status: 'CANCELLED',  restaurantId: 3, lines: [], totalSantim: 12000 },
  { id: 8,  customer: 'Tigist Bekele',  area: 'Piassa',    status: 'PENDING',    restaurantId: 4, lines: [], totalSantim: 36000 },
  { id: 9,  customer: 'Samuel Kebede',  area: 'Megenagna', status: 'PREPARING',  restaurantId: 1, lines: [], totalSantim: 27500 },
  { id: 10, customer: 'Liya Mekonnen',  area: 'Bole',      status: 'ON_THE_WAY', restaurantId: 2, lines: [], totalSantim: 41000 },
  { id: 11, customer: 'Henok Desta',    area: 'Kazanchis', status: 'PENDING',    restaurantId: 1, lines: [], totalSantim: 15000 },
  { id: 12, customer: 'Rahel Worku',    area: 'Piassa',    status: 'DELIVERED',  restaurantId: 4, lines: [], totalSantim: 60000 },
  { id: 13, customer: 'Biruk Negash',   area: 'Megenagna', status: 'PENDING',    restaurantId: 3, lines: [], totalSantim: 22000 },
  { id: 14, customer: 'Eden Solomon',   area: 'Bole',      status: 'CANCELLED',  restaurantId: 2, lines: [], totalSantim: 9500 },
];
