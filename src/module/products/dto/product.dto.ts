import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsNumber()
    id?:number;

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