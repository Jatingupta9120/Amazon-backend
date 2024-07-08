import { Model, Column, DataType } from 'sequelize-typescript';

export class District extends Model<District> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    emai: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;
}
