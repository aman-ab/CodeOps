import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { AREAS, type Area } from '../restaurant.types';

export class CreateRestaurantDto {
  /**
   * Restaurant name. Must be unique (case-insensitive); a duplicate answers 409.
   * @example "Sishu"
   */
  @IsString() @Length(2, 80)
  name!: string;

  /** The area the kitchen is in. */
  @ApiProperty({ enum: AREAS, example: 'Kazanchis' })
  @IsIn(AREAS)
  area!: Area;

  /**
   * Whether it takes orders right now. Defaults to true.
   * @example true
   */
  @IsBoolean() @IsOptional()
  isOpen?: boolean;
}
