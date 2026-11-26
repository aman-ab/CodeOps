import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DISH_REPOSITORY, InMemoryDishRepository } from './dishes.repository';
import { DishesService } from './dishes.service';

@Module({
  controllers: [DishesController],
  providers: [
    DishesService,
    { provide: DISH_REPOSITORY, useClass: InMemoryDishRepository },
  ],
  exports: [DishesService], // half 1 of "export + import"
})
export class DishesModule {}
