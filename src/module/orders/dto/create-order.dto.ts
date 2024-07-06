import { IsDateString, IsEnum, isInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "../entity/order.entity";
import { Transform } from "class-transformer";
import { Product } from "src/module/products/entity/product.entity";
import { OrderProduct } from "../entity/order-product";
import { IsInt } from "sequelize-typescript";


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

    @IsString()
    @IsOptional()
    orderCode?: string;

    @IsDateString()
    @IsOptional()
    orderDate?: Date;

    @IsString()
    @IsOptional()
    orderType?: string;

    @IsString()
    @IsOptional()
    products?: OrderProduct[];

    @IsString()
    @IsOptional()
    orderStatus?: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsOptional()
    totalPrice?: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsOptional()
    @IsString()
    address:string;
  }

export class PaginatedOrdersResultDto {

  @IsNumber()
  @IsOptional()
  userid?: number;

  data?: Order[];

  @IsNumber()
  @IsOptional()
  offset?: number=0;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number=500;

  @IsNumber()
  @IsOptional()
  totalCount?: number;
}

