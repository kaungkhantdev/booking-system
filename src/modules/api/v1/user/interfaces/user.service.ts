export interface CreateUser {
  name: string;
  email: string;
  hash_password: string;
  country_id: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  hashPassword?: string;
  is_active?: boolean;
}
