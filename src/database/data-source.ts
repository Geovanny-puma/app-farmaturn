import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getDatabaseConfig } from '../config/database.config';

const database = getDatabaseConfig();

const baseOptions: DataSourceOptions = {
  type: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: database.synchronize,
  logging: database.logging,
  ssl: database.ssl,
};

export const dataSourceOptions: DataSourceOptions = database.url
  ? {
      ...baseOptions,
      url: database.url,
    }
  : {
      ...baseOptions,
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.database,
    };

export default new DataSource(dataSourceOptions);
