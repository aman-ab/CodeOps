import { Inject, Injectable,NotFoundException } from "@nestjs/common";
import { Area, Restaurant } from "./restaurant.types";
import { RESTAURANT_REPOSITORY, type RestaurantRepository } from "./restaurants.repository";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";


@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repo: RestaurantRepository,
  ) {}

  findAll(area?: Area): Restaurant[] {
    const rows = this.repo.all();
    return area ? rows.filter((r) => r.area === area) : rows;
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }
    return hit;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    return this.repo.save({ ...dto, id, isOpen: dto.isOpen ?? true });
  }
}
