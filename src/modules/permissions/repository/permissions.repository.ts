import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

export class PermissionsRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {
    super(Permission, repository.manager, repository.queryRunner);
  }
}
