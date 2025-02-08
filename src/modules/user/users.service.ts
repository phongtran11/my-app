import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToInstance } from 'class-transformer';
import { GetUsersResDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async create() {
    return 'this action return user';
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return plainToInstance(GetUsersResDto, users, {});
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
