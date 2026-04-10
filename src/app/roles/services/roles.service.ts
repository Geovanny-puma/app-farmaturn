import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import {
  ROLES_REPOSITORY,
  RolesRepository,
} from '../interfaces/roles-repository.interface';
import { FilterRolesParams } from '../params/filter-roles.params';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    await this.ensureRoleNameIsAvailable(createRoleDto.name);

    const role = this.rolesRepository.create(createRoleDto);

    return this.rolesRepository.save(role);
  }

  async findAll(params: FilterRolesParams): Promise<PaginatedResponse<Role>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const [data, total] = await this.rolesRepository.findAll(params);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    if (updateRoleDto.name) {
      await this.ensureRoleNameIsAvailable(updateRoleDto.name, id);
    }

    this.rolesRepository.merge(role, updateRoleDto);

    return this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.rolesRepository.softDelete(id);
  }

  private async ensureRoleNameIsAvailable(
    name: string,
    ignoredRoleId?: string,
  ): Promise<void> {
    const role = await this.rolesRepository.findByName(name, ignoredRoleId);

    if (role) {
      throw new ConflictException('Role name is already in use');
    }
  }
}
