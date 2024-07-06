import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { OrderModule } from 'src/module/orders/order.module';
import { ProductModule } from 'src/module/products/product.module';
import { UserModule } from 'src/module/users/user.module';

const dynamicModule = [
    {
        path: 'users',
        module: UserModule,
    },
    {
        path: 'orders',
        module: OrderModule,
    },
    {
        path: 'products',
        module: ProductModule,
    },
];

@Module({})
export class AppRouterModule {
    static register(): DynamicModule {
        return {
            module: AppRouterModule,
            imports: [
                ...dynamicModule.map((item) => item.module),
                RouterModule.register(dynamicModule),
            ],
        };
    }
}
