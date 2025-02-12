import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiListQuery } from 'src/shared/decorators/api-list-query.decorator';
import {
  GetUserListFilterDto,
  GetUserListOrderDto,
  GetUserListQueryDto,
  GetUserListResDto,
} from './dto/get-user-list.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiListQuery(GetUserListFilterDto, GetUserListOrderDto)
  @ApiOkResponse({
    type: GetUserListResDto,
  })
  getUserListByQuery(
    @Query() getUserListingQueryDto: GetUserListQueryDto,
  ): Promise<GetUserListResDto> {
    return this.userService.getUserListByQuery(getUserListingQueryDto);
  }
}
