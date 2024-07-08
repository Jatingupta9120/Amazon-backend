import { IsArray, IsDateString, IsEnum, isInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Order } from "../entity/order.entity";
import { Transform, Type } from "class-transformer";
import { Product } from "src/module/products/entity/product.entity";
import { OrderProduct } from "../entity/order-product";
import { IsInt } from "sequelize-typescript";
import { CreateOrderItemDto } from "./create-order-item.dto";


export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVER = 'DELIVER',
  CANCEL = 'CANCEL',
}
export class CreateOrderDto {

    @IsNotEmpty()
    userId: number;

    @IsArray()
    @IsOptional()
    @Type(() => CreateOrderItemDto)
    @ValidateNested({ each: true })
    orderItems?: CreateOrderItemDto[];

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsOptional()
    @IsString()
    address?:string;
  }

export class PaginatedOrdersResultDto {

  @IsNumber()
  @IsOptional()
  userid?: number;


  @IsArray()
  @IsOptional()
  @Type(() => CreateOrderItemDto)
  orderItems?: CreateOrderItemDto[];

  
  @IsOptional()
  orders?: OrderProduct[];  

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  offset?: number=0;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number=500;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsString()
  @IsOptional()
  sortBy?: string;

}

