import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (
        database: ConfigType<typeof databaseConfig>,
      ): TypeOrmModuleOptions => {
        const baseOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: database.synchronize,
          logging: database.logging,
          ssl: database.ssl,
        };

        if (database.url) {
          return {
            ...baseOptions,
            url: database.url,
          };
        }

        return {
          ...baseOptions,
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
