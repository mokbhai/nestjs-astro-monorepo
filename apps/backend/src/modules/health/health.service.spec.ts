import { HealthService } from './health.service';
import Redis from 'ioredis';

type RedisMock = {
  ping: jest.Mock<Promise<string>, []>;
  quit: jest.Mock<Promise<'OK'>, []>;
};

describe('HealthService', () => {
  let service: HealthService;
  let redisMock: RedisMock;

  beforeEach(() => {
    redisMock = {
      ping: jest.fn<Promise<string>, []>(),
      quit: jest.fn<Promise<'OK'>, []>(),
    };
    jest
      .spyOn(Redis.prototype, 'ping')
      .mockImplementation(() => redisMock.ping());
    jest
      .spyOn(Redis.prototype, 'quit')
      .mockImplementation(() => redisMock.quit());
    service = new HealthService();
    // @ts-expect-error: Assigning mock Redis instance for testing
    service.redis = redisMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return ok when Redis is healthy', async () => {
    redisMock.ping.mockResolvedValue('PONG');
    const result = await service.getHealth();
    expect(result).toEqual({ status: 'ok', redis: 'ok' });
  });

  it('should return error when Redis is not healthy', async () => {
    redisMock.ping.mockRejectedValue(new Error('Redis down'));
    const result = await service.getHealth();
    expect(result.redis).toContain('error');
    expect(result.status).toBe('ok');
  });

  it('should call quit on destroy', async () => {
    await service.onModuleDestroy();
    expect(redisMock.quit).toHaveBeenCalled();
  });
});
