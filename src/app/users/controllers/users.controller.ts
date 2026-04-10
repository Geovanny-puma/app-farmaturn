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
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FilterUsersParams } from '../params/filter-users.params';
import { UserIdParams } from '../params/user-id.params';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: FilterUsersParams) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() params: UserIdParams) {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: UserIdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: UserIdParams) {
    return this.usersService.remove(params.id);
  }
}
