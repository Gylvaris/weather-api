import { z } from 'zod';

const configSchema = z.object({ API_KEY: z.string() });
export const config = configSchema.parse(process.env);
