import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany,  Model, Table } from 'sequelize-typescript';
import { Product } from 'src/module/products/entity/product.entity';
import { User } from 'src/module/users/entity/user.entity';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';
import { OrderProduct } from './order-product';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { Type } from 'class-transformer';
import {  IsOptional,IsArray } from 'class-validator';

@CustomTable('orders')
export class Order extends Model<Order> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: DataType.INTEGER,
    })
    userid: number;

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        allowNull:false,
        autoIncrement:true,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    Price: number;
      
    @Column({
        type:DataType.STRING,
        allowNull: true,
    })
    address: string;

    @HasMany(()=>OrderProduct)
    products: OrderProduct[];
}
