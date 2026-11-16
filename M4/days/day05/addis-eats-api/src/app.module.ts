import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersService } from './orders.service';

@Module({
  imports: [RestaurantsModule, DishesModule, OrdersModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
