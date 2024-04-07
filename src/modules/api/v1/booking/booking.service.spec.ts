import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';

const jestBookingRepository = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

const jestBookingService = {
  findPackages: jest.fn().mockResolvedValue([
    {
      name: 'firstName #1',
    },
    {
      name: 'firstName #2',
    },
  ]),
};

describe('BookingService', () => {
  let service: BookingService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: BookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        BookingRepository,
        {
          provide: BookingService,
          useValue: jestBookingService,
        },
        {
          provide: BookingRepository,
          useValue: jestBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repo = module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
