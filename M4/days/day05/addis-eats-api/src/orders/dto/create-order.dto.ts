import { IsString, IsInt, Min, IsIn, Matches, IsOptional }
  from "class-validator";
 
export class CreateOrderDto {
  @IsString()
  customer!: string;
 
  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area!: Area;
 
  @IsInt() @Min(1)
  totalSantim!: number;
 
  @IsOptional()
  @Matches(/^(?:\+251|0)9\d{8}$/, {
    message: "phone must be a valid TeleBirr number",
  })
  phone?: string;
}
