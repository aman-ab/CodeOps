import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { AREAS, type Area } from '../restaurant.types';

export class CreateRestaurantDto {
  @IsString() @Length(2, 80)
  name!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsBoolean() @IsOptional()
  isOpen?: boolean;
}
