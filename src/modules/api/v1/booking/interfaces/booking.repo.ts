import { Classes, Users } from '@database/entities';

export interface CreateBooking {
  user: Users;
  class: Classes;
  cancel?: boolean;
  success: boolean;
}

export interface UpdateBooking {
  user?: Users;
  class?: Classes;
  cancel?: boolean;
  success: boolean;
}
