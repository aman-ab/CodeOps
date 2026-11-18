import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ORDER_REPOSITORY, InMemoryOrderRepository } from './order.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
  exports: [OrdersService], // <--- Export it so Restaurants can use it
})
export class OrdersModule {}
