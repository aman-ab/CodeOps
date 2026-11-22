import { Injectable } from '@nestjs/common';
import { Dish } from './dish.types';
import { SEED_DISHES } from './dish.seed';

export const DISH_REPOSITORY = 'DISH_REPOSITORY';

export interface DishRepository {
  all(restaurantId?: number): Dish[];
  byId(id: number): Dish | undefined;
  save(dish: Dish): Dish;
}

@Injectable()
export class InMemoryDishRepository implements DishRepository {
  // Initialize with the seed data
  private readonly rows = new Map<number, Dish>(
    SEED_DISHES.map((d) => [d.id, d]),
  );

  all(restaurantId?: number): Dish[] {
    const dishes = Array.from(this.rows.values());
    if (restaurantId) {
      return dishes.filter((d) => d.restaurantId === restaurantId);
    }
    return dishes;
  }

  byId(id: number): Dish | undefined {
    return this.rows.get(id);
  }

  save(dish: Dish): Dish {
    this.rows.set(dish.id, dish);
    return dish;
  }
}
