export interface CreateCountry {
  name: string;
  country_code: string;
  timezone_gmt: string;
  timezone_name: string;
}

export interface UpdateCountry {
  name?: string;
  country_code?: string;
  timezone_gmt?: string;
  timezone_name?: string;
}
