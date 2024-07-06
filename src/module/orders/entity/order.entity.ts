import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/module/products/entity/product.entity';
import { User } from 'src/module/users/entity/user.entity';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';
import { OrderProduct } from './order-product';

@CustomTable('orders')
export class Order extends Model<Order> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    userid: string;

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        allowNull:false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({
        allowNull: false,
        unique:true,
        type: DataType.STRING,
    })
    OrderCode: string;

    @Column({
        type: DataType.ENUM,
        values: ['PENDING', 'IN_PROGRESS', 'DONE'],
        allowNull: false,
    })
    OrderStatus: string;

    @Column({
        allowNull: true,
        type: DataType.INTEGER,
    })
    OrderQuantity: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    TotalPrice: number;
                                
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at: string;

    @HasMany(()=>Product)
    products: Product[];
}
