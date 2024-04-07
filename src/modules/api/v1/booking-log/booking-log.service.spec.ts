import { Test, TestingModule } from '@nestjs/testing';
import { BookingLogService } from './booking-log.service';

describe('BookingLogService', () => {
  let service: BookingLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingLogService],
    }).compile();

    service = module.get<BookingLogService>(BookingLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
