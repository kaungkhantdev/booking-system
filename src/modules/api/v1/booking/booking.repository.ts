import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from '@database/entities';
import { Repository } from 'typeorm';
import { CreateBooking } from './interfaces/booking.repo';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Bookings)
    private readonly repo: Repository<Bookings>,
  ) {}

  async create(data: CreateBooking): Promise<Bookings> {
    try {
      const booking = new Bookings();

      booking.user = data.user;
      booking.class = data.class;
      booking.success = data.success;
      booking.cancel = data.cancel;

      return await this.repo.save(booking);
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findAll(): Promise<Bookings[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findAllByClassId(class_id: number): Promise<number> {
    try {
      return await this.repo.count({
        where: { class: { id: class_id }, success: true },
        relations: ['class'],
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findOneBy(data: object): Promise<Bookings> {
    try {
      return await this.repo.findOne({
        where: data,
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async findByUserId(user_id: number): Promise<Bookings[]> {
    try {
      return await this.repo.find({
        where: { user: { id: user_id } },
        relations: ['user'],
      });
    } catch (error) {
      const err = error as Error;
      throw new NotAcceptableException(err.message);
    }
  }

  async update(id: string, attrs: Partial<Bookings>): Promise<Bookings> {
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
