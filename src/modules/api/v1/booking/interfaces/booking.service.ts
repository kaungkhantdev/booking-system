export interface CreateBooking {
  user_id: string;
  class_id: string;
  cancel?: boolean;
  success: boolean;
}

export interface UpdateBooking {
  user_id?: string;
  class_id?: string;
  cancel?: boolean;
  success: boolean;
}

export interface Booking {
  user_id: string;
  class_id: string;
}

export interface CancelBooking {
  booking_id: string;
  user_id: string;
  class_id: string;
}
