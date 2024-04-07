export interface signUp {
  name: string;
  email: string;
  password: string;
  c_password: string;
  otp_code: string;
  country_id: string;
}

export interface signIn {
  email: string;
  password: string;
}
