import { ApiProperty } from '@nestjs/swagger';

export class DishDto {
  @ApiProperty({ description: 'Assigned by the server.', example: 1 })
  id!: number;

  @ApiProperty({ description: 'The restaurant whose menu this dish is on.', example: 1 })
  restaurantId!: number;

  @ApiProperty({ example: 'Doro Wat' })
  name!: string;

  @ApiProperty({ description: 'Whole santim. 32000 is 320.00 ETB.', example: 32000 })
  priceSantim!: number;
}

export class PagedDishDto {
  @ApiProperty({ type: [DishDto] })
  items!: DishDto[];

  @ApiProperty({ description: 'Matches BEFORE paging.', example: 8 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}
