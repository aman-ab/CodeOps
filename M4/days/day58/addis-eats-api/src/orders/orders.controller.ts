import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { OrdersService } from './orders.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FindOrdersQueryDto } from './dto/find-orders-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() query: FindOrdersQueryDto) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateOrderDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newOrder = this.ordersService.create(dto);
    res.header('Location', `/api/v1/orders/${newOrder.id}`);
    return newOrder;
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  cancel(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }
}
