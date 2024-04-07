import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Bookings } from '@database/entities';
import {
  Booking,
  CancelBooking,
  CreateBooking,
  UpdateBooking,
} from './interfaces/booking.service';
import { BookingRepository } from './booking.repository';
import { UserService } from '../user/user.service';
import { ClassService } from '../class/class.service';
import { ERROR_MSG } from '@config/constants';
import { BookingLogService } from '../booking-log/booking-log.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { isEnded } from '@utils/time';

@Injectable()
export class BookingService {
  private persist: any[];
  private storeKey: string;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private repo: BookingRepository,
    private userService: UserService,
    private bookingLogService: BookingLogService,
    private classSErvice: ClassService,
  ) {
    this.persist = [];
    this.storeKey = 'wait_list_1';
  }

  async findByUserId(data: { user_id: number }) {
    return await this.repo.findByUserId(data.user_id);
  }

  async createBooking(data: CreateBooking): Promise<Bookings> {
    const user = await this.userService.findById(data.user_id);
    const cls = await this.classSErvice.findByIdClass(data.class_id);

    if (!user || !cls) {
      throw new NotFoundException(ERROR_MSG.USER_CLASS_NOT_FOUND);
    }

    const modifyData = {
      user,
      class: cls,
      cancel: data.cancel,
      success: data.success,
    };

    return this.repo.create(modifyData);
  }

  async findBookings(): Promise<Bookings[]> {
    return await this.repo.findAll();
  }

  async findById(id: string): Promise<Bookings> {
    return await this.repo.findOneBy({ id });
  }

  async updateBookings(id: string, data: UpdateBooking) {
    const booking = await this.repo.findOneBy({ id });

    if (!booking) {
      throw new NotFoundException(`Sorry, this booking is not found.`);
    }

    return await this.repo.update(id, data);
  }

  /** Booking */
  async booking(data: Booking) {
    try {
      const cls = await this.classSErvice.findByIdClass(data.class_id);
      const user = await this.userService.findById(data.user_id);

      /** same country */
      if (user.country.id != cls.country.id) {
        throw new BadRequestException(ERROR_MSG.COUNTRY_DIF);
      }

      const count = await this.countBooking(Number(data.class_id));

      /** check end time */
      const clsEndTime = cls.end_time;
      if (isEnded(clsEndTime, cls.country.timezone)) {
        this.persist = [];
        this.cacheClear();
      }

      if (cls.user_limit > count) {
        return await this.bookingSuccess(data);
      } else {
        return await this.bookingWaitList(data);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /** booking success */
  async bookingSuccess(data: { user_id: string; class_id: string }) {
    const cls = await this.classSErvice.findByIdClass(data.class_id);
    const clsCredit = cls.credit;

    const user = await this.userService.findById(data.user_id);

    if (clsCredit > user.credit) {
      throw new BadRequestException(ERROR_MSG.LOW_CREDIT);
    }

    const user_credit = user.credit - clsCredit;

    /** reduce user's credit */
    await this.userService.updateUser(data.user_id, { credit: user_credit });

    const booking = await this.createBooking({
      ...data,
      success: true,
    });

    const dataSave = {
      booking_id: booking.id.toString(),
      type: 'success booking',
      remark: `Reduce user credit - ${clsCredit}`,
    };
    await this.saveBookingLog(dataSave);

    return 'Successfully, you have been booking.';
  }

  /** booking cancel */
  async bookingCancel(data: CancelBooking) {
    const cls = await this.classSErvice.findByIdClass(data.class_id);
    const clsCredit = cls.credit;

    const user = await this.userService.findById(data.user_id);
    const count = await this.countBooking(Number(data.class_id));
    const user_credit = user.credit + clsCredit;

    /** add user's credit */
    await this.userService.updateUser(data.user_id, { credit: user_credit });

    const booking = await this.updateBookings(data.booking_id, {
      ...data,
      cancel: true,
      success: false,
    });

    const dataSave = {
      booking_id: booking.id.toString(),
      type: 'cancel booking',
      remark: `refund user credit - ${clsCredit}`,
    };
    await this.saveBookingLog(dataSave);

    const wait_list_1 = await this.getValue(this.storeKey);
    if (wait_list_1 && wait_list_1.length > 0) {
      const data = wait_list_1.pop();
      if (cls.user_limit > count) {
        await this.bookingSuccess(data);
      }
    }

    return 'Successfully, you have been cancel booking.';
  }

  /** booking wait list */
  async bookingWaitList(data: Booking) {
    this.persist.push(data);

    await this.setValue(this.storeKey, this.persist);
    throw new BadRequestException(ERROR_MSG.WAITING_LIST);
  }

  /** save to booking log */
  async saveBookingLog(data: {
    booking_id: string;
    type: string;
    remark: string;
  }) {
    const booking = await this.findById(data.booking_id);
    await this.bookingLogService.createBookingLog({ ...data, booking });
  }

  /** count booking */
  async countBooking(class_id: number) {
    const count = await this.repo.findAllByClassId(class_id);
    return count;
  }

  /** save to redis */

  async setValue(key: string, value: any): Promise<void> {
    return await this.cacheManager.set(key, value, 0);
  }

  /** get from redis ( FIFO ) */
  async getValue(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  /** clear from redis ( FIFO ) */
  async cacheClear(): Promise<any> {
    return await this.cacheManager.reset();
  }
}
