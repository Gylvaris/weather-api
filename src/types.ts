// Type for weather condition
export interface Condition {
  text: string;
}

// Type for location details
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Type for the current weather data
export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  windchill_c: number;
  heatindex_c: number;
  dewpoint_c: number;
  vis_km: number;
  uv: number;
  gust_kph: number;
}

// Type for the entire "data" object
export interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

// Root type that represents the entire JSON structure
export interface WeatherApiResponse {
  data: WeatherData;
}
