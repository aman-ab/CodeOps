import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class OrderLineDto {
  /**
   * Id of a dish on the menu of the restaurant being ordered from.
   * @example 1
   */
  @IsInt() @IsPositive()
  dishId!: number;

  /**
   * How many of that dish, 1 to 20.
   * @example 2
   */
  @IsInt() @Min(1) @Max(20)
  quantity!: number;
}
