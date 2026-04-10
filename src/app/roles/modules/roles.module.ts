import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROLES_REPOSITORY } from '../constants/repositories';
import { RolesController } from '../controllers/roles.controller';
import { Role } from '../entities/role.entity';
import { RolesRepository } from '../repositories/roles.repository';
import { RolesService } from '../services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [
    {
      provide: ROLES_REPOSITORY,
      useClass: RolesRepository,
    },
    RolesService,
  ],
  exports: [ROLES_REPOSITORY, RolesService],
})
export class RolesModule {}
