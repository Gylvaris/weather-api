import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { getWeatherData } from './getWeather';

const app = new Hono();

app.get('/', r => r.json({ message: 'Here u can check your weather!' }));
app.get('/weather/:city', r =>
  getWeatherData(r.req.param('city'))
    .then(data => r.json({ data }))
    .catch((error: unknown) => {
      console.error(error);

      if (error instanceof Error) {
        return r.json({ error: error.message }, 500);
      }

      return r.json({ error: 'An error occurred' }, 500);
    }),
);

serve(app);
