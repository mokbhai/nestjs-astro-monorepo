import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            getHealth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should return health status from service', async () => {
    const healthResult = { status: 'ok', redis: 'ok' };
    jest.spyOn(service, 'getHealth').mockResolvedValue(healthResult);
    const result = await controller.getHealth();
    expect(result).toEqual(healthResult);
  });
});
