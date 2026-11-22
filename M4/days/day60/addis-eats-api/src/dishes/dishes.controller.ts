import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiError } from '../common/decorators/api-docs.decorator';
import type { Page } from '../common/page';
import type { Dish } from './dish.types';
import { DishDto, PagedDishDto } from './dto/dish.dto';
import { DishesService } from './dishes.service';
import { FindDishesQuery } from './dto/find-dishes.query';

@ApiTags('dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishes: DishesService) {}

  @Get()
  @ApiOperation({
    summary: 'List dishes across all restaurants, sorted and paged',
    description: 'Prices are whole santim. Use `?restaurantId=` for one restaurant, or `GET /restaurants/{id}/dishes`.',
  })
  @ApiOkResponse({ type: PagedDishDto })
  @ApiError(400, 'A query value is invalid')
  findAll(@Query() q: FindDishesQuery): Page<Dish> {
    return this.dishes.findAll(q);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One dish by id' })
  @ApiOkResponse({ type: DishDto })
  @ApiError(400, 'The id is not a whole number')
  @ApiError(404, 'No dish with that id')
  findOne(@Param('id', ParseIntPipe) id: number): Dish {
    return this.dishes.findOne(id);
  }
}
