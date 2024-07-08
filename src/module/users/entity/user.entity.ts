import { Column, DataType, ForeignKey, HasMany, Model } from 'sequelize-typescript';
// import { OrderProduct } from 'src/module/orders/entity/order-product';
import { Order } from 'src/module/orders/entity/order.entity';
import { Product } from 'src/module/products/entity/product.entity';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';
@CustomTable('users')
export class User extends Model<User> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        defaultValue: DataType.INTEGER,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    username: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    created_at: Date;

    @HasMany(() => Order)
    order: Order[];

    @HasMany(() => Product)
    product: Product[];



    
}
