import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingLogs } from '@database/entities';
import { Repository } from 'typeorm';
import { CreateBookingLog } from './interfaces/booking-log.repo';

@Injectable()
export class BookingLogRepository {
  constructor(
    @InjectRepository(BookingLogs)
    private readonly repo: Repository<BookingLogs>,
  ) {}

  async create(data: CreateBookingLog): Promise<BookingLogs> {
    try {
      const booking = new BookingLogs();

      booking.booking = data.booking;
      booking.type = data.type;
      booking.remark = data.remark;

      return await this.repo.save(booking);
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findAll(): Promise<BookingLogs[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<BookingLogs> {
    try {
      return await this.repo.findOne({
        where: data,
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async update(id: string, attrs: Partial<BookingLogs>): Promise<BookingLogs> {
    try {
      const booking = await this.repo.findOneById(id);

      Object.assign(booking, attrs);
      await this.repo.save(booking);

      return this.findOneBy({ id });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }
}
