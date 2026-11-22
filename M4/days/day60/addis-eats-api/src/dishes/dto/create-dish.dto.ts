import { IsString, IsInt, Min, Length } from 'class-validator';

export class CreateDishDto {
  @IsInt()
  restaurantId!: number;

  @IsString()
  @Length(2, 80)
  name!: string;

  @IsInt()
  @Min(1)
  priceSantim!: number;
}
