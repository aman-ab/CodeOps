import {
  Body, Controller, Delete, Get, Header, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query, Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { API_BASE } from '../common/api.constants';
import { ApiAreaQuery, ApiError } from '../common/decorators/api-docs.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { setLocation } from '../common/location';
import type { Page } from '../common/page';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import { Area } from '../restaurants/restaurant.types';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders.query';
import { OrderDto, PagedOrderDto } from './dto/order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import type { Order } from './order.types';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'List orders, filtered, sorted and paged',
    description:
      'Oldest first unless `sort` says otherwise: use `?sort=-id` for newest first. ' +
      '`?fields=id,status` returns smaller items. Filters combine: `?status=PENDING&area=Bole`.',
  })
  @ApiAreaQuery()
  @ApiOkResponse({ type: PagedOrderDto })
  @ApiError(400, 'A query value is invalid: unknown status, area or sort field, limit over 50, unknown field name')
  findAll(
    @Query() q: FindOrdersQuery,
    @Query('area', ParseAreaPipe) areas?: Area[],
  ): Page<Partial<Order>> {
    return this.orders.findAll(q, { areas });
  }

  @Get(':id')
  @ApiOperation({ summary: 'One order by id' })
  @ApiOkResponse({ type: OrderDto })
  @ApiError(400, 'The id is not a whole number')
  @ApiError(404, 'No order with that id')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.orders.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  @ApiOperation({
    summary: 'Place an order',
    description:
      'The server prices the order from the dishes (price x quantity, plus the optional tip): never send a total. ' +
      'Checked in this order: the restaurant exists (404), it is open (409), every dish exists (404) and is on its menu (422).',
  })
  @ApiCreatedResponse({
    type: OrderDto,
    description: 'Created, status PENDING. The Location header holds the new order\'s address, /api/v1/orders/{id}.',
  })
  @ApiError(400, 'Validation failed: `message` lists every problem at once. A field the API does not know (such as totalSantim) is also a 400')
  @ApiError(404, 'The restaurant or one of the dishes does not exist')
  @ApiError(409, 'The restaurant is closed and is not taking orders')
  @ApiError(422, 'A dish is not on the menu of the restaurant being ordered from')
  create(
    @Body() dto: CreateOrderDto,
    @Res({ passthrough: true }) res: Response,
  ): Order {
    const order = this.orders.create(dto);
    setLocation(res, `${API_BASE}/orders/${order.id}`);
    return order;
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: "Move an order to its next status",
    description: 'Only legal moves are accepted: PENDING to PREPARING or CANCELLED, PREPARING to ON_THE_WAY or CANCELLED, ON_THE_WAY to DELIVERED. DELIVERED and CANCELLED are final.',
  })
  @ApiOkResponse({ type: OrderDto })
  @ApiError(400, 'The id is not a whole number, or `status` is missing or not a known status')
  @ApiError(404, 'No order with that id')
  @ApiError(409, 'That move is not allowed from the order\'s current status. Re-read the order; do not retry the same call')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Order {
    return this.orders.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @Roles('staff')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Cancel (delete) an order. Staff only',
    description: 'Idempotent: it answers 204 every time, even if the order was already gone or never existed. Needs a staff `x-api-key` (use Authorize).',
  })
  @ApiNoContentResponse({ description: 'The order no longer exists. Empty body.' })
  @ApiError(400, 'The id is not a whole number')
  @ApiError(401, 'No x-api-key header was sent')
  @ApiError(403, 'The key is wrong, or it belongs to a caller who is not staff')
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.orders.cancel(id);
  }
}
