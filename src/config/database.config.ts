import { registerAs } from '@nestjs/config';

const parseBoolean = (value: string | undefined): boolean => value === 'true';

export interface DatabaseConfig {
  url?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
  synchronize: boolean;
  logging: boolean;
}

export const getDatabaseConfig = (): DatabaseConfig => ({
  url: process.env.DATABASE_URL,
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DB ?? 'postgres',
  ssl:
    Boolean(process.env.DATABASE_URL) || parseBoolean(process.env.POSTGRES_SSL),
  synchronize: parseBoolean(process.env.POSTGRES_SYNCHRONIZE),
  logging: parseBoolean(process.env.POSTGRES_LOGGING),
});

export default registerAs('database', getDatabaseConfig);
