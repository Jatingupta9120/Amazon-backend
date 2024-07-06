//import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
//import { Cache } from 'cache-manager';
import * as Redis from 'ioredis';
@Injectable()
export class RedisService {
    constructor(
        //@Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject('REDIS_CLIENT') private redisClient: Redis.Redis,
    ) {}

    async setValue<T>(
        key: string,
        value: T,
        ispermanent: boolean,
        time?: number,
    ) {
        (await ispermanent)
            ? this.redisClient.set(key, JSON.stringify(value))
            : this.redisClient.set(key, JSON.stringify(value), 'EX', time);
        return `${key}:${value} is stored in redis successfully`;
    }

    async getValue(key: string) {
        const result = await this.redisClient.get(key);
        if (result) {
            return JSON.parse(result);
        } else {
            return `${key} is not available in redis`;
        }
    }

    async getTtl(key: string) {
        const result = await this.redisClient.ttl(key);
        if (result > 0) {
            return result;
        } else {
            return `${key} is not available in redis1`;
        }
    }

    async deleteKey(key: string) {
        await this.redisClient.del(key);
        return `${key} is deleted from redis`;
    }

    async setHashValue(
        hashkey: string,
        field: string,
        value: any,
        ispermanent: boolean,
        time?: number,
    ) {
        const result = await this.redisClient.hset(hashkey, field, value);
        if (result == 1) {
            (await ispermanent) ? '' : this.redisClient.expire(hashkey, time);
            return `${hashkey} with hash value is stored in redis`;
        }
        return `${field} is already present in redis`;
    }

    async getHashValue(hashkey: string, field: string) {
        return await this.redisClient.hget(hashkey, field);
    }
}
