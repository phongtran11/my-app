import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiListQuery } from 'src/shared/decorators/api-list-query.decorator';
import {
  GetUserListDto,
  GetUserListFilterDto,
  GetUserListOrderDto,
  GetUserListQueryDto,
} from '../dto/get-user-list.dto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseErrorResponseDto } from 'src/shared/bases/base-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiListQuery(GetUserListFilterDto, GetUserListOrderDto)
  @ApiOkResponse({
    type: GetUserListDto,
  })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  getListByQuery(@Query() getUserListingQueryDto: GetUserListQueryDto) {
    return this.userService.getListByQuery(getUserListingQueryDto);
  }
}
