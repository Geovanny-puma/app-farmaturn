import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { RolesRepository as RolesRepositoryContract } from '../interfaces/roles-repository.interface';
import { FilterRolesParams } from '../params/filter-roles.params';

@Injectable()
export class RolesRepository implements RolesRepositoryContract {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto): Role {
    return this.repository.create(createRoleDto);
  }

  save(role: Role): Promise<Role> {
    return this.repository.save(role);
  }

  findAll(params: FilterRolesParams): Promise<[Role[], number]> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const where: FindOptionsWhere<Role>[] = [];
    const baseFilters =
      params.isActive === undefined
        ? {}
        : { isActive: params.isActive === 'true' };

    if (params.search) {
      where.push({ ...baseFilters, name: ILike(`%${params.search}%`) });
      where.push({ ...baseFilters, description: ILike(`%${params.search}%`) });
    }

    return this.repository.findAndCount({
      where: where.length > 0 ? where : (baseFilters as FindOptionsWhere<Role>),
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string): Promise<Role | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByName(name: string, ignoredRoleId?: string): Promise<Role | null> {
    return this.repository.findOne({
      where: {
        name,
        ...(ignoredRoleId ? { id: Not(ignoredRoleId) } : {}),
      },
      withDeleted: true,
    });
  }

  merge(role: Role, updateRoleDto: UpdateRoleDto): Role {
    return this.repository.merge(role, updateRoleDto);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
