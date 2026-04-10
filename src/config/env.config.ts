import databaseConfig from './database.config';

const REQUIRED_ENV_VARIABLES = [
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
];

export const envFilePath = ['.env'];

export const configLoaders = [databaseConfig];

export function validateEnvironment(
  config: Record<string, string | undefined>,
): Record<string, string | undefined> {
  if (config.DATABASE_URL) {
    return config;
  }

  const missingVariables = REQUIRED_ENV_VARIABLES.filter(
    (variable) => !config[variable],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}`,
    );
  }

  const postgresPort = Number(config.POSTGRES_PORT);

  if (!Number.isInteger(postgresPort) || postgresPort <= 0) {
    throw new Error('POSTGRES_PORT must be a positive integer');
  }

  return config;
}
