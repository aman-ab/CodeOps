import { Type } from 'class-transformer';
import {
  ArrayNotEmpty, IsArray, IsIn, IsInt, IsOptional, IsString, Length, Min,
  Validate, ValidateIf, ValidateNested,
} from 'class-validator';
import { IsSantimConstraint } from '../../common/validators/is-santim.constraint';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.validator';
import { AREAS, type Area } from '../../restaurants/restaurant.types';
import { OrderLineDto } from './order-line.dto';
import { PhoneRequiredWithTip } from './phone-required-with-tip.constraint';

// NOTE: there is NO totalSantim here. The server prices the order from the dishes.
// A client that could name its own total could order Doro Wat for one santim.
export class CreateOrderDto {
  @IsString() @Length(2, 80)
  customer!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsInt() @Min(1)
  restaurantId!: number;

  // BOTH decorators are required for nested validation:
  //   @Type tells class-transformer which class to build,
  //   @ValidateNested tells class-validator to descend into it.
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];

  // @IsOptional() MUST come first: it tells the others to skip when absent.
  @IsOptional()
  @Validate(IsSantimConstraint)
  tipSantim?: number;

  // Not @IsOptional(): that would skip EVERY rule below when phone is absent, and the
  // cross-field rule could never fire. @ValidateIf says exactly when the rules apply.
  @ValidateIf((o: CreateOrderDto) => o.phone !== undefined || o.tipSantim !== undefined)
  @IsTeleBirrNumber()
  @Validate(PhoneRequiredWithTip)
  phone?: string;
}
