import { Controller } from '@nestjs/common';

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurants: RestaurantsService) {}
 
  @Get()
  findAll(@Query("area") area?: Area) { return this.restaurants.findAll(area); }
 
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.restaurants.findOne(id);
  }
}
@Post()
create(@Body() dto: CreateRestaurantDto): Restaurant {
  return this.restaurants.create(dto);
}
