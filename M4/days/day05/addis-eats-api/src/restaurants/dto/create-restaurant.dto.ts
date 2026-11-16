export class CreateRestaurantDto {
  @IsString() @Length(2, 80)
  name!: string;
 
  @IsIn(AREAS)
  area!: Area;
 
  @IsBoolean() @IsOptional()
  isOpen?: boolean;
}
