import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import type { Page } from '../common/page';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import type { Area } from '../restaurants/restaurant.types';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { FindOrdersQuery } from './dto/find-orders.query';
import { Order } from './order.types';
import { OrdersService } from './orders.service';

// Same URL as before: GET /api/v1/restaurants/:restaurantId/orders
// It lives here (not in RestaurantsController) so Orders -> Restaurants is a ONE-WAY dependency.
@Controller('restaurants/:restaurantId/orders')
export class RestaurantOrdersController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly orders: OrdersService,
  ) {}

  @Get()
  findAll(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Query() q: FindOrdersQuery,
    @Query('area', ParseAreaPipe) areas?: Area[],
  ): Page<Partial<Order>> {
    this.restaurants.findOne(restaurantId); // parent first: 404, never an empty []
    return this.orders.findAll(q, { restaurantId, areas });
  }
}
