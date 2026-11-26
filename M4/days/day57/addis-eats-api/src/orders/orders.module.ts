import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { InMemoryOrderRepository, ORDER_REPOSITORY } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },
  ],
  exports: [OrdersService], // RestaurantsController needs it for /restaurants/:id/orders
})
export class OrdersModule {}
