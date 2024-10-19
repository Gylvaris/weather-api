import { HTTPException } from 'hono/http-exception';

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
});
