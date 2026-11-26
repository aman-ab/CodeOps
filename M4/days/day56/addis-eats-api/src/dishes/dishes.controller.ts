import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { type Page } from '../common/page';
import { type Dish } from './dish.types';
import { DishesService } from './dishes.service';
import { FindDishesQuery } from './dto/find-dishes.query';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishes: DishesService) {}

  @Get()
  findAll(@Query() q: FindDishesQuery): Page<Dish> {
    return this.dishes.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dish {
    return this.dishes.findOne(id);
  }
}
