import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  configLoaders,
  envFilePath,
  validateEnvironment,
} from './config/env.config';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './app/roles/modules/roles.module';
import { UsersModule } from './app/users/modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: configLoaders,
      validate: validateEnvironment,
    }),
    DatabaseModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
