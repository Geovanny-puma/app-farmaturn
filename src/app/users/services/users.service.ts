import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import {
  ROLES_REPOSITORY,
  RolesRepository,
} from '../../roles/interfaces/roles-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from '../interfaces/users-repository.interface';
import { FilterUsersParams } from '../params/filter-users.params';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.ensureEmailIsAvailable(createUserDto.email);
    await this.ensureRoleIsActive(createUserDto.roleId);

    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async findAll(params: FilterUsersParams): Promise<PaginatedResponse<User>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const [data, total] = await this.usersRepository.findAll(params);

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

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email) {
      await this.ensureEmailIsAvailable(updateUserDto.email, id);
    }

    if (updateUserDto.roleId) {
      await this.ensureRoleIsActive(updateUserDto.roleId);
    }

    this.usersRepository.merge(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.softDelete(id);
  }

  private async ensureEmailIsAvailable(
    email: string,
    ignoredUserId?: string,
  ): Promise<void> {
    const user = await this.usersRepository.findByEmail(email, ignoredUserId);

    if (user) {
      throw new ConflictException('User email is already in use');
    }
  }

  private async ensureRoleIsActive(roleId: string): Promise<void> {
    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

    if (!role.isActive) {
      throw new BadRequestException('Role is inactive');
    }
  }
}
