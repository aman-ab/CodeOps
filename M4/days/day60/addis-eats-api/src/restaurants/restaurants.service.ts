import { Inject, Injectable } from '@nestjs/common';
import { DuplicateNameError, RestaurantNotFoundError } from '../common/domain-errors';
import { Page, paginate } from '../common/page';
import { parseSort, sortRows } from '../common/sort';
import { Area, Restaurant } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery, RESTAURANT_SORT_FIELDS } from './dto/find-restaurants.query';
import { RESTAURANT_REPOSITORY, type RestaurantRepository } from './restaurants.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: RestaurantRepository,
  ) {}

  // areas arrives already normalised by ParseAreaPipe ("bole" -> "Bole")
  findAll(q: FindRestaurantsQuery, areas?: readonly Area[]): Page<Restaurant> {
    let rows = this.repo.all();

    // 1 - filter
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
    const name = dto.name.trim();
    const taken = this.repo.all().some((r) => r.name.toLowerCase() === name.toLowerCase());
    if (taken) throw new DuplicateNameError(name); // valid request, clashes with state -> 409

    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    return this.repo.save({ ...dto, name, id, isOpen: dto.isOpen ?? true });
  }
}
