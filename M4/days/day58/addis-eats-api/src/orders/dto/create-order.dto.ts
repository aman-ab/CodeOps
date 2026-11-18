import {
  IsString,
  IsIn,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { Area } from '../order.types';
import { AREAS } from '../order.types'; 
import { OrderLineDto } from './order-line.dto';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr.validator';
import { IsSantimConstraint } from '../../common/validators/is-santim.validator';

export class CreateOrderDto {
  @IsString()
  customer!: string;

  @IsIn(AREAS)
  area!: Area;

  @Validate(IsSantimConstraint)
  totalSantim!: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];

  @IsOptional()
  @IsTeleBirrNumber()
  phone?: string;
}
