import { Injectable, Logger } from '@nestjs/common';
import { GetUserListQueryDto } from '../dto/get-user-list.dto';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async create() {
    return 'this action return user';
  }

  async getListByQuery(getUserListQueryDto: GetUserListQueryDto) {
    // get query params
    const { page, limit, filters, orders } = getUserListQueryDto;

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
  }
}
