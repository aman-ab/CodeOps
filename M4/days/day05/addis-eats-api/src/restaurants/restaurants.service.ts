import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  constructor(@Inject(RESTAURANT_REPOSITORY)
              private readonly repo: RestaurantRepository) {}
 
  findAll(area?: Area): Restaurant[] {
    const rows = this.repo.all();
    return area ? rows.filter((r) => r.area === area) : rows;
  }
  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) throw new RestaurantNotFoundError(id);
    return hit;
  }
}
create(dto: CreateRestaurantDto): Restaurant {
  const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
