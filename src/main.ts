import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';

import { getWeatherData } from './getWeather';
import { getConnInfo } from '@hono/node-server/conninfo';

const app = new Hono();

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: c => c.req.header('x-forwarded-for') ?? getConnInfo(c).remote.address ?? 'unknown', // Method to generate custom identifiers for clients.
  //store: memoryStore(), // Redis, MemoryStore, etc. See below.
});

app.use('/weather/*', limiter);

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
