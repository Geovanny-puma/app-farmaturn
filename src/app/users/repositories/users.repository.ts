import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository as UsersRepositoryContract } from '../interfaces/users-repository.interface';
import { FilterUsersParams } from '../params/filter-users.params';

@Injectable()
export class UsersRepository implements UsersRepositoryContract {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): User {
    return this.repository.create(createUserDto);
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  findAll(params: FilterUsersParams): Promise<[User[], number]> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const baseFilters = {
      ...(params.roleId ? { roleId: params.roleId } : {}),
      ...(params.isActive === undefined
        ? {}
        : { isActive: params.isActive === 'true' }),
    };
    const where: FindOptionsWhere<User>[] = [];

    if (params.search) {
      where.push({ ...baseFilters, firstName: ILike(`%${params.search}%`) });
      where.push({ ...baseFilters, lastName: ILike(`%${params.search}%`) });
      where.push({ ...baseFilters, email: ILike(`%${params.search}%`) });
      where.push({ ...baseFilters, alias: ILike(`%${params.search}%`) });
      where.push({ ...baseFilters, phone: ILike(`%${params.search}%`) });
    }

    return this.repository.findAndCount({
      where: where.length > 0 ? where : (baseFilters as FindOptionsWhere<User>),
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string, ignoredUserId?: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
        ...(ignoredUserId ? { id: Not(ignoredUserId) } : {}),
      },
      withDeleted: true,
    });
  }

  merge(user: User, updateUserDto: UpdateUserDto): User {
    return this.repository.merge(user, updateUserDto);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
