import { serve } from '@hono/node-server';
import { getConnInfo } from '@hono/node-server/conninfo';
import { Hono } from 'hono';
import { rateLimiter } from 'hono-rate-limiter';

import { getWeatherData } from './getWeather';

const app = new Hono();

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: (context) => context.req.header('x-forwarded-for') ?? getConnInfo(context).remote.address ?? 'unknown', // Method to generate custom identifiers for clients.
  //store: memoryStore(), // Redis, MemoryStore, etc. See below.
});

app.use('/weather/*', limiter);

app.get('/', context => context.json({ message: 'Here u can check your weather!' }));
app.get('/weather/:city', context =>
  getWeatherData(context.req.param('city'))
    .then(data => context.json({ data }))
    .catch((error: unknown) => {
      console.error(error);

      if (error instanceof Error) {
        return context.json({ error: error.message }, 500);
      }

      return context.json({ error: 'An error occurred' }, 500);
    }),
);

serve(app);
