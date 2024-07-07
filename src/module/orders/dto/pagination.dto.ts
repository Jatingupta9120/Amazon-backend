import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { Order } from "../entity/order.entity";

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 500;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset?: number = 0;

    

    
}