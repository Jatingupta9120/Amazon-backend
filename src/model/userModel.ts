import { Column, DataType } from 'sequelize-typescript';
import { CustomTable } from 'src/utils/custom-class-validator/validator/customTable';
/**
 * Through @customTable decorator we can add createdAt and UpdatedAt in our model and we can pass as much as options
 */
@CustomTable('user')
export class User {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;
}
