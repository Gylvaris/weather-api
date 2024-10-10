import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { getWeatherData } from './getWeather';

const app = new Hono();

app.get('/', r => r.json({ message: 'Witamy w burdelu!' }));
app.get('/weather', r =>
  getWeatherData()
    .then(data => r.json({ data }))
    .catch(error => r.json({ error: error.message })),
);

serve(app);
