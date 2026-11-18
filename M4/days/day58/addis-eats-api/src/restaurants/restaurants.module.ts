import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurant.repository';
import { OrdersModule } from '../orders/orders.module'; // <--- Import the Orders Module

@Module({
  imports: [OrdersModule], // <--- Add to imports
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
})
export class RestaurantsModule {}
