import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiListQuery } from 'src/shared/decorators/api-list-query.decorator';
import {
  GetUsersFilterDto,
  GetUsersOrderDto,
  GetUsersResDto,
} from './dto/get-users.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiListQuery(GetUsersFilterDto, GetUsersOrderDto)
  @ApiOkResponse({
    type: GetUsersResDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
