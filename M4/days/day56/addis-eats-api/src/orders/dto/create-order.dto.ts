import { IsIn, IsInt, IsString, Length, Min } from 'class-validator';
import { AREAS } from '../../restaurants/restaurant.types';
import type {Area} from '../../restaurants/restaurant.types';
export class CreateOrderDto {
  @IsString() @Length(2, 80)
  customer!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsInt() @Min(1)
  restaurantId!: number;

  @IsInt() @Min(1)
  totalSantim!: number;
}
