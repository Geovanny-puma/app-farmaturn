import { IsUUID } from 'class-validator';

export class RoleIdParams {
  @IsUUID()
  id: string;
}
