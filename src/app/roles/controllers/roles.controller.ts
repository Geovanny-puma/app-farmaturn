import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { FilterRolesParams } from '../params/filter-roles.params';
import { RoleIdParams } from '../params/role-id.params';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() params: FilterRolesParams) {
    return this.rolesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() params: RoleIdParams) {
    return this.rolesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: RoleIdParams, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(params.id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: RoleIdParams) {
    return this.rolesService.remove(params.id);
  }
}
