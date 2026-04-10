import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  alias?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  phone?: string;

  @IsUUID()
  roleId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
