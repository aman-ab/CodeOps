import { Inject, Injectable } from '@nestjs/common';
import { RestaurantNotFoundError } from '../common/domain-errors';
import { Page, paginate } from '../common/page';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import { Restaurant } from './restaurant.types';
import { RESTAURANT_REPOSITORY, type RestaurantRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: RestaurantRepository,
  ) {}

  findAll(q: FindRestaurantsQuery): Page<Restaurant> {
    let rows = this.repo.all();

    // 1 - filter
    if (q.area) rows = rows.filter((r) => r.area === q.area);
    if (q.isOpen !== undefined) rows = rows.filter((r) => r.isOpen === q.isOpen);

    // 2 - sort (a copy: sort mutates)
    rows = [...rows].sort((a, b) => a[q.sort].localeCompare(b[q.sort]));

    // 3 - page, last
    return paginate(rows, q.limit, q.offset);
  }

  findOpen(q: FindRestaurantsQuery): Page<Restaurant> {
    return this.findAll({ ...q, isOpen: true });
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) throw new RestaurantNotFoundError(id);
    return hit;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    // deliberately naive - the database replaces this in Module 5
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    return this.repo.save({ ...dto, id, isOpen: dto.isOpen ?? true });
  }
}
