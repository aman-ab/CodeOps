import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class OrderLineDto {
  @IsInt()
  @IsPositive()
  dishId!: number;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;
}
