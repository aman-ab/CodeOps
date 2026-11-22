import {
  Body, Controller, Get, Param, ParseIntPipe, Post, Query, Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { API_BASE } from '../common/api.constants';
import { ApiAreaQuery, ApiError } from '../common/decorators/api-docs.decorator';
import { setLocation } from '../common/location';
import type { Page } from '../common/page';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import type{ Dish } from '../dishes/dish.types';
import { DishDto, PagedDishDto } from '../dishes/dto/dish.dto';
import { DishesService } from '../dishes/dishes.service';
import { FindDishesQuery } from '../dishes/dto/find-dishes.query';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import { PagedRestaurantDto, RestaurantDto } from './dto/restaurant.dto';
import type { Area, Restaurant } from './restaurant.types';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly dishes: DishesService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List restaurants, filtered, sorted and paged',
    description:
      'Closed restaurants still appear: check `isOpen`, or ask for open ones only with `?isOpen=true`. ' +
      'Sorted by name unless `sort` says otherwise.',
  })
  @ApiAreaQuery()
  @ApiOkResponse({ type: PagedRestaurantDto })
  @ApiError(400, 'A query value is invalid: unknown area, limit over 50, unknown sort field, isOpen that is not true or false')
  findAll(
    @Query() q: FindRestaurantsQuery,
    @Query('area', ParseAreaPipe) areas?: Area[],
  ): Page<Restaurant> {
    return this.restaurants.findAll(q, areas);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One restaurant by id' })
  @ApiOkResponse({ type: RestaurantDto })
  @ApiError(400, 'The id is not a whole number')
  @ApiError(404, 'No restaurant with that id')
  findOne(@Param('id', ParseIntPipe) id: number): Restaurant {
    return this.restaurants.findOne(id);
  }

  @Get(':id/dishes')
  @ApiOperation({ summary: "List a restaurant's menu, sorted and paged" })
  @ApiOkResponse({ type: PagedDishDto })
  @ApiError(400, 'The id or a query value is invalid')
  @ApiError(404, 'No restaurant with that id')
  findDishes(
    @Param('id', ParseIntPipe) id: number,
    @Query() q: FindDishesQuery,
  ): Page<Dish> {
    this.restaurants.findOne(id);
    return this.dishes.findAll(q, id);
  }

  @Get(':id/dishes/:dishId')
  @ApiOperation({ summary: "One dish from a restaurant's menu" })
  @ApiOkResponse({ type: DishDto })
  @ApiError(400, 'An id is not a whole number')
  @ApiError(404, 'The restaurant does not exist, the dish does not exist, or the dish is on another restaurant\'s menu')
  findDish(
    @Param('id', ParseIntPipe) id: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ): Dish {
    this.restaurants.findOne(id);
    return this.dishes.findOneOfRestaurant(id, dishId);
  }

  // GET /restaurants/:id/orders lives in OrdersModule (RestaurantOrdersController).

  @Post()
  @ApiOperation({
    summary: 'Add a restaurant',
    description: 'The server assigns the id. Open by default.',
  })
  @ApiCreatedResponse({
    type: RestaurantDto,
    description: 'Created. The Location header holds the new restaurant\'s address, /api/v1/restaurants/{id}.',
  })
  @ApiError(400, 'Validation failed: `message` lists every problem at once, and a field the API does not know is rejected too')
  @ApiError(409, 'A restaurant with that name already exists')
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) res: Response,
  ): Restaurant {
    const created = this.restaurants.create(dto);
    setLocation(res, `${API_BASE}/restaurants/${created.id}`);
    return created;
  }
}
