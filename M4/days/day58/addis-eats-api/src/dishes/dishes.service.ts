import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Dish } from './dish.types';
import type { DishRepository } from './dish.repository';
import { DISH_REPOSITORY } from './dish.repository';
import { CreateDishDto } from './dto/create-dish.dto';

const EXISTING_RESTAURANTS = [1, 2, 3, 4];

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly repo: DishRepository,
  ) {}

  findAll(restaurantId?: number): Dish[] {
    return this.repo.all(restaurantId);
  }

  findOne(id: number): Dish {
    const dish = this.repo.byId(id);
    if (!dish) {
      throw new NotFoundException(`Dish ${id} not found`);
    }
    return dish;
  }

  create(dto: CreateDishDto): Dish {
    // Reject if the restaurant does not exist (Acceptance Criteria 4)
    if (!EXISTING_RESTAURANTS.includes(dto.restaurantId)) {
      throw new NotFoundException(`Restaurant ${dto.restaurantId} not found`);
    }

    // Generate new ID
    const nextId = Math.max(0, ...this.repo.all().map((d) => d.id)) + 1;

    const newDish: Dish = {
      ...dto,
      id: nextId,
    };

    return this.repo.save(newDish);
  }
}
