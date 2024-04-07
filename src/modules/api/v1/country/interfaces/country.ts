export interface CreateCountry {
  name: string;
  country_code: string;
  timezone: string;
}

export interface UpdateCountry {
  name?: string;
  country_code?: string;
  timezone?: string;
}
