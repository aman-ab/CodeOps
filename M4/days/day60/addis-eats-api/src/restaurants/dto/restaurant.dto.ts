import { ApiProperty } from '@nestjs/swagger';
import { AREAS, type Area } from '../restaurant.types';

export class RestaurantDto {
  @ApiProperty({ description: 'Assigned by the server.', example: 1 })
  id!: number;

  @ApiProperty({ example: 'Yod Abyssinia' })
  name!: string;

  @ApiProperty({ enum: AREAS, example: 'Bole' })
  area!: Area;

  @ApiProperty({ description: 'False means closed: it still appears in lists but orders to it answer 409.', example: true })
  isOpen!: boolean;
}

export class PagedRestaurantDto {
  @ApiProperty({ type: [RestaurantDto] })
  items!: RestaurantDto[];

  @ApiProperty({ description: 'Matches BEFORE paging.', example: 4 })
  total!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}
