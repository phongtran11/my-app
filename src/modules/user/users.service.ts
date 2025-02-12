import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToInstance } from 'class-transformer';
import {
  GetUserListQueryDto,
  GetUserListResDto,
  UserListItem,
} from './dto/get-user-list.dto';
import { BasePaginationResDto } from 'src/shared/bases/base.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async create() {
    return 'this action return user';
  }

  async getUserListByQuery(
    getUserListQueryDto: GetUserListQueryDto,
  ): Promise<GetUserListResDto> {
    // get query params
    const { page, take, filters, orders } = getUserListQueryDto;

    // create query builder
    const queryBuilder = this.usersRepository.createDefaultQueryBuilder();

    // build query filters
    if (filters?.email) {
      this.usersRepository.buildFilterLikeEmail(queryBuilder, filters.email);
    }

    // build query orders
    if (orders?.createdAt) {
      this.usersRepository.buildOrderByCreatedAt(
        queryBuilder,
        orders.createdAt,
      );
    }

    // get users with pagination
    const [users, totalUsersCount] = await queryBuilder.getManyAndCount();

    const pagination = new BasePaginationResDto(
      page,
      users.length,
      take,
      totalUsersCount,
    );

    // return response
    return plainToInstance(GetUserListResDto, {
      items: plainToInstance(UserListItem, users),
      filters,
      orders,
      pagination,
    });
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} ${updateUserDto} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
