import NodeCache from 'node-cache';

import { config } from './config';

const cache = new NodeCache({ stdTTL: 600 });

export async function getWeatherData(city: string): Promise<WeatherApiResponse> {
  const cachedData = cache.get(city);

  if (cachedData) {
    console.log('Returning cached data for', city);
    return cachedData as WeatherApiResponse;
  }

  const params = new URLSearchParams({
    q: city,
    key: config.API_KEY,
  });

  const response = await fetch(`http://api.weatherapi.com/v1/current.json?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = (await response.json()) as WeatherApiResponse;

  cache.set(city, data);
  console.log('Fetching new data for', city);

  return data;
}
