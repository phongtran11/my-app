import { Injectable } from '@nestjs/common';
import { CreatePermissionReqDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionsRepository } from '../repository/permissions.repository';
import { plainToInstance } from 'class-transformer';
import { Permission } from '../entities/permission.entity';
import { BaseCreatedResDto } from 'src/shared/bases/base.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async create(
    createPermissionReqDto: CreatePermissionReqDto,
  ): Promise<BaseCreatedResDto> {
    // transform to Permission entity
    const permission = plainToInstance(Permission, createPermissionReqDto);

    // insert permission
    await this.permissionsRepository.insert(permission);

    return plainToInstance(BaseCreatedResDto, permission);
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
