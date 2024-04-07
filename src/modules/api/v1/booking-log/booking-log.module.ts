import { Module } from '@nestjs/common';
import { BookingLogService } from './booking-log.service';
import { BookingLogController } from './booking-log.controller';
import { BookingLogs } from '@database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingLogRepository } from './booking-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingLogs])],
  providers: [BookingLogService, BookingLogRepository],
  controllers: [BookingLogController],
  exports: [BookingLogService],
})
export class BookingLogModule {}
