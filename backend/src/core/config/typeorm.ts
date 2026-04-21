import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// Ensure env vars are available even when this file is imported before Nest ConfigModule boots.
// Load base env first, then environment-specific values with override.
dotenvConfig({ path: '.env' });
if (process.env.NODE_ENV === 'test') {
  dotenvConfig({ path: '.env.test', override: true });
} else {
  dotenvConfig({ path: '.env.prod', override: true });
}

const withRequiredSslMode = (rawUrl: string): string => {
  try {
    const parsed = new URL(rawUrl);
    if (!parsed.searchParams.has('sslmode')) {
      parsed.searchParams.set('sslmode', 'require');
    }
    return parsed.toString();
  } catch {
    return rawUrl;
  }
};

const logDatabaseTarget = (databaseUrl: string): void => {
  try {
    const parsed = new URL(databaseUrl);
    const host = parsed.hostname || 'unknown-host';
    const port = parsed.port || '5432';
    const databaseName = parsed.pathname?.replace('/', '') || 'postgres';
    console.log(
      `[TypeORM] Using database target ${host}:${port}/${databaseName}`,
    );
  } catch {
    console.log('[TypeORM] Using database target from environment variable');
  }
};

const buildTypeOrmConfig = (): TypeOrmModuleOptions => {
  const rawDatabaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URI;

  if (!rawDatabaseUrl) {
    throw new Error(
      'Missing database connection string. Set DATABASE_URL (or DATABASE_URI).',
    );
  }
  const databaseUrl = withRequiredSslMode(rawDatabaseUrl);
  logDatabaseTarget(databaseUrl);

  return {
    type: 'postgres',
    url: databaseUrl,
    ssl: { rejectUnauthorized: false },
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
  };
};

export default registerAs('typeorm', buildTypeOrmConfig);
const { autoLoadEntities: _autoLoadEntities, ...rawOptions } =
  buildTypeOrmConfig();
const dataSourceOptions: DataSourceOptions = rawOptions as DataSourceOptions;
export const connectionSource = new DataSource(dataSourceOptions);