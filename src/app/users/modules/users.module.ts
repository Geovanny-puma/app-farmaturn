import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../../roles/modules/roles.module';
import { USERS_REPOSITORY } from '../constants/repositories';
import { UsersController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from '../services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
