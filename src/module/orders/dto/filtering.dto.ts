import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilteringDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    @IsOptional()
    userid?: number;

    @IsString()
    @IsOptional()
    orderStatus?: string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 500;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset?: number = 0;
}