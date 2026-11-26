import { Module } from '@nestjs/common';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [RestaurantsModule, DishesModule, OrdersModule, PaymentsModule],
})
export class AppModule {}
