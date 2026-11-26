import { Dish } from './dish.types';

export const SEED_DISHES: Dish[] = [
  { id: 1, restaurantId: 1, name: 'Doro Wat', priceSantim: 32000 }, // Yod Abyssinia
  { id: 2, restaurantId: 1, name: 'Kitfo', priceSantim: 35000 }, // Yod Abyssinia
  { id: 3, restaurantId: 2, name: 'Shiro', priceSantim: 18000 }, // Kategna
  { id: 4, restaurantId: 2, name: 'Tibs', priceSantim: 29000 }, // Kategna
  { id: 5, restaurantId: 3, name: 'Beyaynetu', priceSantim: 22000 }, // Habesha 2000
  { id: 6, restaurantId: 3, name: 'Gomen', priceSantim: 14000 }, // Habesha 2000
  { id: 7, restaurantId: 4, name: 'Injera', priceSantim: 5000 }, // Dashen
  { id: 8, restaurantId: 4, name: 'Misir Wat', priceSantim: 16000 }, // Dashen
];
