import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO, UserParamsDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { Response as ResponseCustom } from '../../../utils/response/response.decorator';
import { masterResponseName } from 'src/constants/response/responseCode/user';
import { Transaction } from 'sequelize';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    // //getallUser
    // @Get()
    // @ResponseCustom(masterResponseName.GET_ALL_USERS)
    // async getAllUser(@Query() query: UserParamsDTO) {
    //     return await this.userService.getAllUser(query);
    // }

    //create user
    @Post()
    // @UseGuards(AuthGuard('jwt'))dbTransaction:Transaction
    async createUser(@Body() userDto: CreateUserDTO,dbTransaction:Transaction) {
        return this.userService.createUser(userDto,dbTransaction);
    }
    
    // //get user get by id
    // @Get('/:id')
    // @ResponseCustom(masterResponseName.GET_ALL_USERS)
    // async findOneById(@Param('id') id: UserParamsDTO) {
    //     return await this.userService.getAllUsersById(id);
    // }

    //delete user get by id
    @Delete('/:id')
    async remove(@Param('id') id: string,dbTransaction:Transaction) {
        return await this.userService.deleteUser(id,dbTransaction);
    }
}
