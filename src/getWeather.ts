import { config } from './config';

export async function getWeatherData() {
  const params = new URLSearchParams({
    q: 'Gryfice',
    key: config.API_KEY,
  });

  const response = await fetch(`http://api.weatherapi.com/v1/current.json?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return data;
}
