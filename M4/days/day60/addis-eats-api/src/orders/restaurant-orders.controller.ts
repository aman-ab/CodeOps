import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiAreaQuery, ApiError } from '../common/decorators/api-docs.decorator';
import type { Page } from '../common/page';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import { Area } from '../restaurants/restaurant.types';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { FindOrdersQuery } from './dto/find-orders.query';
import { PagedOrderDto } from './dto/order.dto';
import { Order } from './order.types';
import { OrdersService } from './orders.service';

// Same URL as before: GET /api/v1/restaurants/:restaurantId/orders
// It lives here (not in RestaurantsController) so Orders -> Restaurants is a ONE-WAY dependency.
@ApiTags('orders')
@Controller('restaurants/:restaurantId/orders')
export class RestaurantOrdersController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly orders: OrdersService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "List one restaurant's orders, filtered, sorted and paged",
    description: 'Takes the same filters as `GET /orders`. A restaurant with no orders answers an empty page, not a 404.',
  })
  @ApiAreaQuery()
  @ApiOkResponse({ type: PagedOrderDto })
  @ApiError(400, 'The id or a query value is invalid')
  @ApiError(404, 'No restaurant with that id')
  findAll(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Query() q: FindOrdersQuery,
    @Query('area', ParseAreaPipe) areas?: Area[],
  ): Page<Partial<Order>> {
    this.restaurants.findOne(restaurantId); // parent first: 404, never an empty []
    return this.orders.findAll(q, { restaurantId, areas });
  }
}
