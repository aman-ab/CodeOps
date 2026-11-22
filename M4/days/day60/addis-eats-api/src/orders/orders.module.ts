import { Module } from '@nestjs/common';
import { DishesModule } from '../dishes/dishes.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { OrdersController } from './orders.controller';
import { InMemoryOrderRepository, ORDER_REPOSITORY } from './orders.repository';
import { OrdersService } from './orders.service';
import { RestaurantOrdersController } from './restaurant-orders.controller';

@Module({
  imports: [RestaurantsModule, DishesModule], // both export their service
  controllers: [OrdersController, RestaurantOrdersController],
  providers: [
    OrdersService,
    { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
