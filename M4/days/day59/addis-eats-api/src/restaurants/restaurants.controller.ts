import {
  Body, Controller, Get, Param, ParseIntPipe, Post, Query, Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { API_BASE } from '../common/api.constants';
import { setLocation } from '../common/location';
import type { Page } from '../common/page';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import type { Dish } from '../dishes/dish.types';
import { DishesService } from '../dishes/dishes.service';
import { FindDishesQuery } from '../dishes/dto/find-dishes.query';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import { Area,type Restaurant } from './restaurant.types';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly dishes: DishesService,
  ) {}

  // Day 57: GET /restaurants/open is GONE. It was a filter wearing a path.
  // Use GET /restaurants?isOpen=true
  @Get()
  findAll(
    @Query() q: FindRestaurantsQuery,
    @Query('area', ParseAreaPipe) areas?: Area[], // "bole", "BOLE", "bole,piassa"
  ): Page<Restaurant> {
    return this.restaurants.findAll(q, areas);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Restaurant {
    return this.restaurants.findOne(id);
  }

  @Get(':id/dishes')
  findDishes(
    @Param('id', ParseIntPipe) id: number,
    @Query() q: FindDishesQuery,
  ): Page<Dish> {
    this.restaurants.findOne(id);
    return this.dishes.findAll(q, id);
  }

  @Get(':id/dishes/:dishId')
  findDish(
    @Param('id', ParseIntPipe) id: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ): Dish {
    this.restaurants.findOne(id);
    return this.dishes.findOneOfRestaurant(id, dishId);
  }

  // GET /restaurants/:id/orders now lives in OrdersModule (RestaurantOrdersController):
  // orders need restaurants, so restaurants must not import orders (circular).

  @Post()
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) res: Response,
  ): Restaurant {
    const created = this.restaurants.create(dto);
    setLocation(res, `${API_BASE}/restaurants/${created.id}`); // 201 + Location
    return created;
  }
}
