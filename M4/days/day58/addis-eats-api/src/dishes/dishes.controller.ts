import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(@Query('restaurantId') restaurantId?: string) {
    const id = restaurantId ? parseInt(restaurantId, 10) : undefined;
    return this.dishesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDishDto) {
    return this.dishesService.create(dto);
  }
}
