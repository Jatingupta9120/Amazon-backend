import { AutoIncrement, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { CustomTable } from "src/utils/custom-class-validator/validator/customTable";
import { Order } from "./order.entity";
import { Product } from "src/module/products/entity/product.entity";

@CustomTable('orderProduct')
export class OrderProduct  extends Model<OrderProduct>{

    @Column({
        type: DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      })
    id:number;

    @ForeignKey(()=>Order)
    @Column({
    type: DataType.INTEGER,
    })
    orderId: number;

    @ForeignKey(()=>Product)
    @Column({
    type: DataType.INTEGER,
    })
    productId: number;

    @Column({
      type: DataType.INTEGER,
      })
    Quantity:number;

    @Column({
      type: DataType.INTEGER,
      })
    Price:number;
    
    
}