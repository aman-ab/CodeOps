import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import type { Area, Restaurant } from "./restaurant.types";
import { RestaurantsService } from "./restaurants.service";

@Controller("restaurants")
export class RestaurantsController {
 constructor(private readonly restaurants: RestaurantsService) {}
 @Get()
 findAll(@Query("area") area?: Area) { return this.restaurants.findAll(area); }
 @Get(":id")
 findOne(@Param("id", ParseIntPipe) id: number) { return this.restaurants.findOne(id); }
 @Post()
 create(@Body() dto: CreateRestaurantDto): Restaurant {
  return this.restaurants.create(dto);
 }}