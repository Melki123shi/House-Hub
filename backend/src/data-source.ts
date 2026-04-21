import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
if (process.env.NODE_ENV === 'test') {
  dotenvConfig({ path: '.env.test', override: true });
} else {
  dotenvConfig({ path: '.env.prod', override: true });
}

const rawDatabaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URI;
if (!rawDatabaseUrl) {
  throw new Error(
    'Missing database connection string. Set DATABASE_URL (or DATABASE_URI).',
  );
}

const databaseUrl = (() => {
  try {
    const parsed = new URL(rawDatabaseUrl);
    if (!parsed.searchParams.has('sslmode')) {
      parsed.searchParams.set('sslmode', 'require');
    }
    return parsed.toString();
  } catch {
    return rawDatabaseUrl;
  }
})();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: false,
  logging: true,

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
