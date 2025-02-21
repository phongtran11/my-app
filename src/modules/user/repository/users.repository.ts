import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirectionEnum } from 'src/shared/types/query.type';
import { User } from '../entities/user.entity';

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(User, repository.manager, repository.queryRunner);
  }

  createDefaultQueryBuilder() {
    return this.repository.createQueryBuilder('users');
  }

  async isEmailExists(email: string): Promise<boolean> {
    const countUserWithEmail = await this.count({ where: { email } });

    return countUserWithEmail > 0;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  buildFilterLikeEmail(qb: SelectQueryBuilder<User>, email: string) {
    return qb.andWhere('users.email like :email', { email: `%${email}%` });
  }

  buildOrderByCreatedAt(
    qb: SelectQueryBuilder<User>,
    order: OrderDirectionEnum,
  ) {
    return qb.orderBy('users.created_at', order);
  }
}
