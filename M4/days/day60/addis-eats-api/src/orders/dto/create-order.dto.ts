import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty, IsArray, IsIn, IsInt, IsOptional, IsString, Length, Min,
  Validate, ValidateIf, ValidateNested,
} from 'class-validator';
import { IsSantimConstraint } from '../../common/validators/is-santim.constraint';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.validator';
import { AREAS,  type Area } from '../../restaurants/restaurant.types';
import { OrderLineDto } from './order-line.dto';
import { PhoneRequiredWithTip } from './phone-required-with-tip.constraint';

// NOTE: there is NO totalSantim here. The server prices the order from the dishes.
// A client that could name its own total could order Doro Wat for one santim.
export class CreateOrderDto {
  /**
   * Customer's full name as they gave it.
   * @example "Almaz Bekele"
   */
  @IsString() @Length(2, 80)
  customer!: string;

  /** Delivery area. One of the four Addis Ababa zones. */
  @ApiProperty({ enum: AREAS, example: 'Bole' })
  @IsIn(AREAS)
  area!: Area;

  /**
   * Restaurant to order from. It must exist and be open (a closed one answers 409).
   * @example 1
   */
  @IsInt() @Min(1)
  restaurantId!: number;

  // BOTH decorators are required for nested validation:
  //   @Type tells class-transformer which class to build,
  //   @ValidateNested tells class-validator to descend into it.
  /** What to order: at least one line, every dish from the SAME restaurant. */
  @ApiProperty({ type: [OrderLineDto], minItems: 1, example: [{ dishId: 1, quantity: 2 }] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];

  // @IsOptional() MUST come first: it tells the others to skip when absent.
  /**
   * Optional tip. Whole santim: 5000 is 50.00 ETB. Needs a phone, because tips are paid through TeleBirr.
   * @example 5000
   */
  @IsOptional()
  @Validate(IsSantimConstraint)
  tipSantim?: number;

  // Not @IsOptional(): that would skip EVERY rule below when phone is absent, and the
  // cross-field rule could never fire. @ValidateIf says exactly when the rules apply.
  /**
   * TeleBirr number: 09xxxxxxxx or +2519xxxxxxxx. Optional, unless tipSantim is given.
   * @example "0912345678"
   */
  @ValidateIf((o: CreateOrderDto) => o.phone !== undefined || o.tipSantim !== undefined)
  @IsTeleBirrNumber()
  @Validate(PhoneRequiredWithTip)
  phone?: string;
}
