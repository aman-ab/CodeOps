import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

providers: [
  RestaurantsService,
  { provide: RESTAURANT_REPOSITORY,
    useClass: InMemoryRestaurantRepository },
],

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}

