import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO, UserParamsDTO } from '../dto/user.dto';
import { HttpExceptionWrapper } from 'src/utils/error/error.http.wrapper';
import { MASTER_ERROR } from 'src/constants/error';
import { User } from '../entity/user.entity';
import { Transaction } from 'sequelize';
@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    // getAllUser
    async getAllUser(options: UserParamsDTO) {
        const users = await this.userRepository.getAllUsers(options);
        if (!users) {
            throw new HttpExceptionWrapper(MASTER_ERROR.USERS_NOT_EXISTS);
        }
        return users;
    }
    // get all user by id
    async getAllUsersById(options: UserParamsDTO) {
        const user = await this.userRepository.getUserById(options.id);
        return user;
    }
    //get all user by email
    // async findOneByEmail(options: CreateUserDTO) {
    //     const user = await this.userRepository.getUserByEmail(options);
    //     if (!user) {
    //         throw new HttpExceptionWrapper(MASTER_ERROR.USERS_NOT_EXISTS);
    //     }
    //     return user;
    // }

    //Create new User
    async createUser(create: CreateUserDTO) {
            const createdUser = await this.userRepository.createUser(create);
            return createdUser.toJSON();
        
    }

    //delete user
    async deleteUser(id: string) {
        try {
            const user = await this.userRepository.deleteUser(id);
            return user;
        } catch (error) {
            console.log("error while deleting User");
            throw new error;
        }
    }
}
