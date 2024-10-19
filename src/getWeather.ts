import NodeCache from 'node-cache';

import { config } from './config';
import { HTTPException } from 'hono/http-exception';

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
    const data = await response.json();
    if (data.error.code === 1006) {
      throw new HTTPException(404, { message: 'Location not found' });
    }
    if (data.error.code === 2006) {
      throw new HTTPException(404, { message: 'Your API_KEY is invalid. Check .env' });
    }
    if (data.error.code === 2008) {
      throw new HTTPException(404, { message: 'Your API_KEY has been disabled' });
    }
    throw new HTTPException(404, { message: 'It failed... again' });
  }

  const data = (await response.json()) as WeatherApiResponse;

  cache.set(city, data);
  console.log('Fetching new data for', city);
  return data;
}
