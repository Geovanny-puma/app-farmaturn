import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export const ROLE_TABLE_NAME = 'roles';

@Unique('UQ_roles_name', ['name'])
@Index('IDX_roles_is_active', ['isActive'])
@Index('IDX_roles_created_at', ['createdAt'])
@Entity(ROLE_TABLE_NAME)
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('IDX_roles_name_trgm', { synchronize: false })
  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Index('IDX_roles_description_trgm', { synchronize: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
