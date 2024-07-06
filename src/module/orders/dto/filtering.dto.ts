import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilteringDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    orderCode?: string;

    @IsString()
    @IsOptional()
    orderType?: string;

    @IsString()
    @IsOptional()
    orderStatus?: string;
}