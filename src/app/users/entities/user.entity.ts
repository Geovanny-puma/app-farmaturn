import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

export const USER_TABLE_NAME = 'users';

@Unique('UQ_users_email', ['email'])
@Index('IDX_users_role_id', ['roleId'])
@Index('IDX_users_is_active', ['isActive'])
@Index('IDX_users_created_at', ['createdAt'])
@Index('IDX_users_last_login_at', ['lastLoginAt'])
@Entity(USER_TABLE_NAME)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  @Index('IDX_users_first_name_trgm', { synchronize: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  @Index('IDX_users_last_name_trgm', { synchronize: false })
  lastName: string;

  @Column({ type: 'varchar', length: 150 })
  @Index('IDX_users_email_trgm', { synchronize: false })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  @Index('IDX_users_alias_trgm', { synchronize: false })
  alias?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @Index('IDX_users_phone_trgm', { synchronize: false })
  phone?: string | null;

  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
