import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import type { Restaurant } from "./restaurant.types";
import { RestaurantsService } from "./restaurants.service";
import { FindRestaurantsQuery } from "./dto/find-restaurants.query";

@Controller("restaurants")
export class RestaurantsController {
 constructor(private readonly restaurants: RestaurantsService) {}
 @Get()
 findAll(@Query() query: FindRestaurantsQuery) {
  return this.restaurants.findAll(query);
}
 @Get(":id")
 findOne(@Param("id", ParseIntPipe) id: number) { return this.restaurants.findOne(id); }
 @Post()
 create(@Body() dto: CreateRestaurantDto): Restaurant {
  return this.restaurants.create(dto);
 }


}