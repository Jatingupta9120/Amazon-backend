import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrderRepository } from './repository/orders.repository';
import { OrdersController } from './controller/orders.controller';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService,OrderRepository ],
    exports: [OrderRepository],
})
export class OrderModule {}
