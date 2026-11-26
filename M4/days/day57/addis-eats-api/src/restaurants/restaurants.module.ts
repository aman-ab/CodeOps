import { Module } from '@nestjs/common';
import { DishesModule } from '../dishes/dishes.module';
import { OrdersModule } from '../orders/orders.module';
import { RestaurantsController } from './restaurants.controller';
import { InMemoryRestaurantRepository, RESTAURANT_REPOSITORY } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [DishesModule, OrdersModule], // half 2 of "export + import"
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    // Module 5: change THIS line only
    { provide: RESTAURANT_REPOSITORY, useClass: InMemoryRestaurantRepository },
  ],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
