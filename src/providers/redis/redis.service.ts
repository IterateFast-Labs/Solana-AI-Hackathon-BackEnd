import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  public async get(k: string) {
    return await this.redis.get(k);
  }

  public async set(string: string, value: any, expiredTime: number) {
    return await this.redis.set(string, value, {
      EX: expiredTime,
    });
  }

  public async del(k: string) {
    return await this.redis.del(k);
  }
}
