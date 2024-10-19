import { HTTPException } from 'hono/http-exception';

app.onError((err: unknown) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  throw err;
});
