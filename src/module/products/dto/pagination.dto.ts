import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsString()
    id?:string;
    
    @IsOptional()
    @IsString()
    userid?:string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 500;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset?: number = 0;
}