import { Injectable } from '@nestjs/common';
import { BookingLogs } from '@database/entities';
import { CreateBookingLog } from './interfaces/booking-log.service';
import { BookingLogRepository } from './booking-log.repository';

@Injectable()
export class BookingLogService {
  constructor(private repo: BookingLogRepository) {}

  async createBookingLog(data: CreateBookingLog): Promise<BookingLogs> {
    return this.repo.create(data);
  }

  async findBookingLogs(): Promise<BookingLogs[]> {
    return await this.repo.findAll();
  }

  async findById(id: string): Promise<BookingLogs> {
    return await this.repo.findOneBy({ id });
  }
}
