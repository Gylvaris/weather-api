import { z } from 'zod';

export const locationSchema = z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string(),
})

export const errorSchema = z.object({
    error: z.object({
        code: z.number(),
        message: z.string(),
    })
})