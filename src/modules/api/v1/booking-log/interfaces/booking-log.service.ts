import { Bookings } from '@database/entities';

export interface CreateBookingLog {
  booking: Bookings;
  type: string;
  remark: string;
}

export interface UpdateBookingLog {
  booking?: Bookings;
  type?: string;
  remark?: string;
}
