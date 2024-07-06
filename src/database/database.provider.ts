import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DatabaseService } from './database.service';
import { Logger } from 'winston';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/module/users/entity/user.entity';
import { Product } from 'src/module/products/entity/product.entity';
import { Order } from 'src/module/orders/entity/order.entity';
import { OrderProduct } from 'src/module/orders/entity/order-product';
export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        inject: [WINSTON_MODULE_PROVIDER, ConfigService, DatabaseService],
        useFactory: async (
            logger: Logger,
            configService: ConfigService,
            databaseService: DatabaseService,
        ) => {
            const sequelize = new Sequelize(
                {dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'ERer00*#',
                database: 'jedex',}
            );

            // Add table modules here...
            sequelize.addModels([User,Product,Order,OrderProduct]);

            // Sync database with module
            const isAlterTable = configService.get(
                'database.postgres.alterTable',
            )!;
            await sequelize.sync({ alter: isAlterTable });

            try {
                await sequelize.authenticate({});

                logger.info('Database connected successfully', {
                    database: sequelize.config.database,
                    username: sequelize.config.username,
                    host: sequelize.config.host,
                    port: sequelize.config.port,
                });

                // Seeding data
                await databaseService.seedingData();
            } catch (error) {
                logger.error(error);
            }
            return sequelize;
        },
    },
];
