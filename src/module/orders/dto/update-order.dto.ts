import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from 'src/module/products/entity/product.entity';

export class UpdateOrderDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    orderType?: string;
    
    @IsOptional()
    @IsString()
    orderStatus?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    totalPrice?: number;
}
