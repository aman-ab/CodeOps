import {
  Body, Controller, Delete, Get, Header, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders.query';
import { UpdateStatusDto } from './dto/update-status.dto';

import { OrdersService } from './orders.service';

import {type Order } from './order.types';
import { type Page } from '../common/page';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  findAll(@Query() q: FindOrdersQuery): Page<Order> {
    return this.orders.findAll(q);
  }

  // STATIC route: must be ABOVE @Get(':id') or "pending" hits ParseIntPipe -> 400
  @Get('pending')
  findPending(@Query() q: FindOrdersQuery): Page<Order> {
    return this.orders.findPending(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    return this.orders.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store') // never cache a write
  create(@Body() dto: CreateOrderDto): Order {
    return this.orders.create(dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Order {
    return this.orders.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 => return void, empty body
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.orders.cancel(id);
  }
}
