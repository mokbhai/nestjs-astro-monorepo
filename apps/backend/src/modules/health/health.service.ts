import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class HealthService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  onModuleInit() {
    this.redis = new Redis({ host: 'localhost', port: 6379 });
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit();
    }
  }

  async getRedisHealth() {
    let redisStatus = 'unknown';
    try {
      await this.redis.ping();
      redisStatus = 'ok';
    } catch (e) {
      console.error('Redis error:', e);
      redisStatus = 'error' + JSON.stringify(e);
    }
    return redisStatus;
  }

  async getHealth() {
    return {
      status: 'ok',
      redis: await this.getRedisHealth(),
    };
  }
}
