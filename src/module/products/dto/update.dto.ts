import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    // @Transform(({ value }) => parseInt(value))
    id?: number;


    @IsString()
    @IsOptional()
    productCode?: string;

    @IsString()
    @IsOptional()
    productName?: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    price?: number;
}
  