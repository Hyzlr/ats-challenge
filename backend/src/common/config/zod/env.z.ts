// lib
import { randomBytes } from 'crypto';
import { z } from 'zod';

export const envValidationSchema = z.object({
  // application configs
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().min(4).max(4).default('8000'),
  APP_ENCRYPTION_KEY: z.string().default(randomBytes(256).toString('hex')),

  // database configs
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
});

export type ValidatedEnvs = z.infer<typeof envValidationSchema>;
