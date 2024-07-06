import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import * as Redis from 'ioredis';
@Module({
    imports: [],
    providers: [
        {
            provide: 'REDIS_CLIENT',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new Redis.Redis({
                    host: configService.get('redis.host'),
                    port: configService.get('redis.port'),
                    // username: configService.get('redis.username'),
                    // password: configService.get('redis.password'),
                });
            },
        },
        RedisService,
    ],
    exports: [RedisService],
})
export class RedisModule {}
