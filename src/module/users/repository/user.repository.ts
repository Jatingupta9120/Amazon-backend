import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UserParamsDTO } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class UserRepository {
    // async getAllUsers(options: UserParamsDTO): Promise<User[]> {
    //     const users = await User.findAll({
    //         where: options.id ? { id: options.id } : {},
    //         attributes: { exclude: ['createdAt', 'updatedAt'] },
    //         limit: options.limit || 10,
    //         offset: options.offset || 0,
    //     });
    //     if (!users) {
    //         throw new HttpException('User not found', 404);
    //     }
    //     return users;
    // }

    // async getUserById(id: string) {
    //     const user = await User.findOne( {
    //         attributes: { exclude: ['createdAt', 'updatedAt'] },
    //     });
    //     if (!user) {
    //         throw new HttpException('User not found', 404);
    //     }
    //     return {user};
    // }

    // async getUserByEmail(options: CreateUserDTO): Promise<User> {
    //     const user = await User.findOne({
    //         where: { email: options.email },
    //         attributes: { exclude: ['createdAt', 'updatedAt'] },
    //     });
    //     if (!user) {
    //         throw new HttpException('User not found', 404);
    //     }
    //     return user;
    // }

    async createUser(params: CreateUserDTO,dbTransaction: Transaction): Promise<User> {
            const hashedPassword = await bcrypt.hash(params.password, 10);
            const newUser = await User.create({...params,password: hashedPassword},{ transaction: dbTransaction });
            return newUser;
    }

    async deleteUser(id: number,dbTransaction: Transaction) {
            const user = await User.destroy({ where: { id:id }, transaction: dbTransaction });
            return `user sucessfully deleted ${user}`;
    }
}
