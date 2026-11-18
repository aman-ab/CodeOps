import { Injectable } from '@nestjs/common';
import type { Restaurant } from './restaurant.types';
import { SEED_RESTAURANTS } from './restaurant.seed';

export const RESTAURANT_REPOSITORY = 'RESTAURANT_REPOSITORY';

export interface RestaurantRepository {
  all(): Restaurant[];
  byId(id: number): Restaurant | undefined;
  save(restaurant: Restaurant): Restaurant;
}

@Injectable()
export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly rows = new Map<number, Restaurant>(
    SEED_RESTAURANTS.map((r) => [r.id, r]),
  );

  all(): Restaurant[] {
    return Array.from(this.rows.values());
  }

  byId(id: number): Restaurant | undefined {
    return this.rows.get(id);
  }

  save(restaurant: Restaurant): Restaurant {
    this.rows.set(restaurant.id, restaurant);
    return restaurant;
  }
}
