import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { RestaurantsService } from './restaurants.service';
import { OrdersService } from '../orders/orders.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  findAll(@Query('isOpen') isOpen?: string) {
    const parsedIsOpen =
      isOpen === 'true' ? true : isOpen === 'false' ? false : undefined;
    return this.restaurantsService.findAll(parsedIsOpen);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Get(':id/orders')
  findOrdersForRestaurant(@Param('id', ParseIntPipe) id: number) {
    this.restaurantsService.findOne(id);
    return this.ordersService.findAll({
      limit: 50,
      offset: 0,
      sort: 'id',
    } as any);
  }

  @Post()
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newRestaurant = this.restaurantsService.create(dto);
    res.header('Location', `/api/v1/restaurants/${newRestaurant.id}`);
    return newRestaurant;
  }
}
