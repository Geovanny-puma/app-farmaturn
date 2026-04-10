import { ROLES_REPOSITORY } from '../constants/repositories';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { FilterRolesParams } from '../params/filter-roles.params';

export interface RolesRepository {
  create(createRoleDto: CreateRoleDto): Role;
  save(role: Role): Promise<Role>;
  findAll(params: FilterRolesParams): Promise<[Role[], number]>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string, ignoredRoleId?: string): Promise<Role | null>;
  merge(role: Role, updateRoleDto: UpdateRoleDto): Role;
  softDelete(id: string): Promise<void>;
}

export { ROLES_REPOSITORY };
