import { Inject, Injectable } from '@nestjs/common';
import { RestaurantNotFoundError } from '../common/domain-errors';
import { Page, paginate } from '../common/page';
import { parseSort, sortRows } from '../common/sort';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery, RESTAURANT_SORT_FIELDS } from './dto/find-restaurants.query';
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
    const areas = q.area;
    if (areas?.length) rows = rows.filter((r) => areas.includes(r.area));
    if (q.isOpen !== undefined) rows = rows.filter((r) => r.isOpen === q.isOpen);

    // 2 - sort
    rows = sortRows(rows, parseSort<(typeof RESTAURANT_SORT_FIELDS)[number]>(q.sort));

    // 3 - page, last
    return paginate(rows, q.limit, q.offset);
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) throw new RestaurantNotFoundError(id);
    return hit;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    return this.repo.save({ ...dto, id, isOpen: dto.isOpen ?? true });
  }
}
