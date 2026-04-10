import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class FilterUsersParams {
  @IsString()
  @IsOptional()
  search?: string;

  @IsUUID()
  @IsOptional()
  roleId?: string;

  @IsBooleanString()
  @IsOptional()
  isActive?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit = 20;
}
