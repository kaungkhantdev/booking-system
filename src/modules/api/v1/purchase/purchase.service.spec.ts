import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { PurchaseRepository } from './purchase.repository';

const jestPurchaseRepository = {
  create: jest
    .fn()
    .mockImplementation((purchase) =>
      Promise.resolve({ id: '1', ...purchase }),
    ),
  findOneBy: jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      name: 'firstName #1',
      id,
    }),
  ),
};

const jestPurchaseService = {
  createPurchase: jest
    .fn()
    .mockImplementation((purchase) =>
      Promise.resolve({ id: '1', ...purchase }),
    ),
};

describe('PurchaseService', () => {
  let service: PurchaseService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: PurchaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        PurchaseRepository,
        {
          provide: PurchaseService,
          useValue: jestPurchaseService,
        },
        {
          provide: PurchaseRepository,
          useValue: jestPurchaseRepository,
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    repo = module.get<PurchaseRepository>(PurchaseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPurchase()', () => {
    it('should create a purchase', () => {
      service.createPurchase({
        user_id: '1',
        package_id: '1',
        expired_time: '',
      });
      expect(
        service.createPurchase({
          user_id: '1',
          package_id: '1',
          expired_time: '',
        }),
      ).resolves.toEqual({
        id: '1',
        user_id: '1',
        package_id: '1',
        expired_time: '',
      });
    });
  });
});
