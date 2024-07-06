import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    productName?: string;

    @IsOptional()
    @IsNumber()
    price?: number;
}