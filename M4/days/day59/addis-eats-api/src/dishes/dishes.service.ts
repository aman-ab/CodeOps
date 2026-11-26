import { Inject, Injectable } from '@nestjs/common';
import { DishNotFoundError } from '../common/domain-errors';
import { Page, paginate } from '../common/page';
import { parseSort, sortRows } from '../common/sort';
import { Dish } from './dish.types';
import { DISH_REPOSITORY, type DishRepository } from './dishes.repository';
import { DISH_SORT_FIELDS, FindDishesQuery } from './dto/find-dishes.query';

@Injectable()
export class DishesService {
  constructor(@Inject(DISH_REPOSITORY) private readonly repo: DishRepository) {}

  // restaurantId from the PATH wins over ?restaurantId from the query
  findAll(q: FindDishesQuery, restaurantId?: number): Page<Dish> {
    const owner = restaurantId ?? q.restaurantId;
    let rows = this.repo.all();
    if (owner !== undefined) rows = rows.filter((d) => d.restaurantId === owner);

    rows = sortRows(rows, parseSort<(typeof DISH_SORT_FIELDS)[number]>(q.sort));
    return paginate(rows, q.limit, q.offset);
  }

  findOne(id: number): Dish {
    const hit = this.repo.byId(id);
    if (!hit) throw new DishNotFoundError(id);
    return hit;
  }

  // Every id must exist (404 otherwise). Duplicates are collapsed.
  findByIds(ids: readonly number[]): Dish[] {
    return [...new Set(ids)].map((id) => this.findOne(id));
  }

  findOneOfRestaurant(restaurantId: number, dishId: number): Dish {
    const hit = this.repo.byId(dishId);
    if (!hit || hit.restaurantId !== restaurantId) {
      throw new DishNotFoundError(dishId, restaurantId);
    }
    return hit;
  }
}
