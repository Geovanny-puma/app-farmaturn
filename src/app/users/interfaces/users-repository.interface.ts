import { USERS_REPOSITORY } from '../constants/repositories';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { FilterUsersParams } from '../params/filter-users.params';

export interface UsersRepository {
  create(createUserDto: CreateUserDto): User;
  save(user: User): Promise<User>;
  findAll(params: FilterUsersParams): Promise<[User[], number]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string, ignoredUserId?: string): Promise<User | null>;
  merge(user: User, updateUserDto: UpdateUserDto): User;
  softDelete(id: string): Promise<void>;
}

export { USERS_REPOSITORY };
