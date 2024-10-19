import { HTTPException } from 'hono/http-exception';
import NodeCache from 'node-cache';

import { config } from './config';
import { currentResponseSchema, CurrentResponseSuccess } from './weather-api-schema/current-schema';

const cache = new NodeCache({ stdTTL: 600 });

export async function getWeatherData(city: string): Promise<CurrentResponseSuccess> {
  const cachedData = cache.get(city);

  if (cachedData) {
    console.log('Returning cached data for', city);
    return cachedData as CurrentResponseSuccess;
  }

  const params = new URLSearchParams({
    q: city,
    key: config.API_KEY,
  });

  const response = await fetch(`http://api.weatherapi.com/v1/current.json?${params}`);

  const data = await currentResponseSchema.parseAsync(await response.json());
  if (!response.ok && 'error' in data) {
    if (data.error.code === 1006) {
      throw new HTTPException(404, { message: 'Location not found' });
    }
    console.log(data.error);
    throw new HTTPException(500);
  }
  if (!('error' in data)) {
    cache.set(city, data);
    console.log('Fetching new data for', city);
    return data;
  }

  throw new HTTPException(500);
}
