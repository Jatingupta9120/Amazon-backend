import { Column, DataType, ForeignKey } from "sequelize-typescript";
import { CustomTable } from "src/utils/custom-class-validator/validator/customTable";
import { Order } from "./order.entity";
import { Product } from "src/module/products/entity/product.entity";
import { Model } from "sequelize";

@CustomTable('orderProduct')
export class OrderProduct  extends Model<OrderProduct>{

    @Column({
        type: DataType.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: DataType.UUIDV4,
      })
    id:string;

    @ForeignKey(()=>Order)
    @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    })
    orderId: string;

    @ForeignKey(()=>Product)
    @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    })
    productId: number;

    @Column({
      type: DataType.NUMBER,
      allowNull: false,
      })
    Quantity:number;

    @Column({
      type: DataType.NUMBER,
      allowNull: false,
      })
    PriceAtPurchase:number;
    
    
}