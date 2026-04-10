import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
}

export const getAppConfig = (): AppConfig => ({
  port: Number(process.env.PORT ?? 3000),
});

export default registerAs('app', getAppConfig);
