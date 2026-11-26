import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class OrderLineDto {
  @IsInt() @IsPositive()
  dishId!: number;

  @IsInt() @Min(1) @Max(20)
  quantity!: number;
}
