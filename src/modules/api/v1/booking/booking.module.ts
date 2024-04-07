import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from '@database/entities';
import { UserModule } from '../user/user.module';
import { ClassModule } from '../class/class.module';
import { BookingRepository } from './booking.repository';
import { BookingLogModule } from '../booking-log/booking-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookings]),
    UserModule,
    ClassModule,
    BookingLogModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService],
})
export class BookingModule {}
