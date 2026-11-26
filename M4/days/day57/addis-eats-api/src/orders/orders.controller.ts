import {
  Body, Controller, Delete, Get, Header, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query, Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { API_BASE } from '../common/api.constants';
import { setLocation } from '../common/location';
import type { Page } from '../common/page';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders.query';
import { UpdateStatusDto } from './dto/update-status.dto';
import type { Order } from './order.types';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  // Day 57: GET /orders/pending is GONE -> GET /orders?status=PENDING
  @Get()
  findAll(@Query() q: FindOrdersQuery): Page<Partial<Order>> {
    return this.orders.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.orders.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(
    @Body() dto: CreateOrderDto,
    @Res({ passthrough: true }) res: Response,
  ): Order {
    const order = this.orders.create(dto);
    setLocation(res, `${API_BASE}/orders/${order.id}`); // 201 + Location
    return order;
  }

  // Kept on purpose: a named sub-action of ONE member, not a filter.
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Order {
    return this.orders.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204, empty body, same answer on the 2nd call
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.orders.cancel(id);
  }
}
