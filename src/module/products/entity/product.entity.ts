import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from 'src/module/orders/entity/order.entity';
import { User } from 'src/module/users/entity/user.entity';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';

@CustomTable('products')
export class Product extends Model<Product> {
  // @ForeignKey(() => Order)
  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  //   defaultValue: DataType.UUIDV4,
  // })
  // orderid: string;

  @Column({
    type: DataType.NUMBER,
    primaryKey:true,
    allowNull:false,
    defaultValue: DataType.NUMBER,
  })
  id:number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl: string;

  @Column({
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
      type: DataType.DATE,
      allowNull: false, 
      defaultValue: DataType.NOW,
  })
  updated_at: Date;

  // @BelongsTo(() => Order)
  // orders: Order[];
}
