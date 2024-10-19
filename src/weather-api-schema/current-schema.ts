import { z } from 'zod';

import { locationSchema, errorSchema } from './common-schema';

export const currentSchema = z.object({
  last_updated_epoch: z.number().optional(),
  last_updated: z.string(),
  temp_c: z.number(),
  temp_f: z.number().optional(),
  is_day: z.number(),
  condition: z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number(),
  }),
  wind_mph: z.number(),
  wind_kph: z.number().optional(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number().optional(),
  precip_mm: z.number(),
  precip_in: z.number().optional(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number().optional(),
  vis_km: z.number(),
  vis_miles: z.number().optional(),
  uv: z.number(),
  gust_mph: z.number().optional(),
  gust_kph: z.number(),
  air_quality: z.object({
    co: z.number(),
    no2: z.number(),
    o3: z.number(),
    so2: z.number(),
    pm2_5: z.number(),
    pm10: z.number(),
    'us-epa-index': z.number(),
    'gb-defra-index': z.number(),
  }).optional(),
});

export const currentResponseSuccessSchema = z.object({
  location: locationSchema,
  current: currentSchema,
  error: z.never(),
});

export const currentResponseSchema = z.discriminatedUnion('error', [
  currentResponseSuccessSchema,
  errorSchema
])

export type CurrentResponse = z.infer<typeof currentResponseSchema >
export type CurrentResponseSuccess = z.infer<typeof currentResponseSuccessSchema >