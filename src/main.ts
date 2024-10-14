import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { getWeatherData } from './getWeather';

const app = new Hono();

app.get('/', r => r.json({ message: 'Here u can check your weather!' }));
app.get('/weather/:city', r =>
  getWeatherData(r.req.param('city'))
    .then(data => r.json({ data }))
    .catch(error => r.json({ error: error.message })),
);

serve(app);
