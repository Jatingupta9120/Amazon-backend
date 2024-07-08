import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrderRepository } from './repository/orders.repository';
import { OrdersController } from './controller/orders.controller';
import { ProductService } from '../products/service/product.service';
import { ProductRepository } from '../products/repository/product.repository';
import { UserService } from '../users/service/user.service';
import { UserRepository } from '../users/repository/user.repository';

@Module({
    
    controllers: [OrdersController],
    providers: [OrdersService,ProductService,OrderRepository,ProductRepository,UserService ,UserRepository],
    exports: [OrderRepository],
})
export class OrderModule {}
