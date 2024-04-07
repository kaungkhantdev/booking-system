import { Test, TestingModule } from '@nestjs/testing';
import { BookingLogService } from './booking-log.service';
import { BookingLogRepository } from './booking-log.repository';

const jestBookingLogRepository = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

const jestBookingLogService = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

describe('BookingLogService', () => {
  let service: BookingLogService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: BookingLogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingLogService,
        BookingLogRepository,
        {
          provide: BookingLogService,
          useValue: jestBookingLogService,
        },
        {
          provide: BookingLogRepository,
          useValue: jestBookingLogRepository,
        },
      ],
    }).compile();

    service = module.get<BookingLogService>(BookingLogService);
    repo = module.get<BookingLogRepository>(BookingLogRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
