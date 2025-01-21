import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/common/drizzle/schema',
  out: 'migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
