import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
 
@Module({
  imports:     [RestaurantsModule],  // what this module borrows
  controllers: [OrdersController],   // its HTTP surface
  providers:   [OrdersService],      // what it can inject
  exports:     [OrdersService],      // what it lends out
})
export class OrdersModule {}
 
// src/app.module.ts - the root, composing the rest
@Module({
  imports: [OrdersModule, RestaurantsModule],
})
export class AppModule {}
