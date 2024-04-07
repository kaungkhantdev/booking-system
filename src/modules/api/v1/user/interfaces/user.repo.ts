import { Countries } from '@database/entities';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  country: Countries;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
