import { Injectable } from '@nestjs/common';
import {
  CreatePermissionRequestDto,
  PermissionResponseDto,
} from '../dto/create-permission.dto';
import { PermissionsRepository } from '../repository/permissions.repository';
import { plainToInstance } from 'class-transformer';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async create(
    createPermissionReqDto: CreatePermissionRequestDto,
  ): Promise<PermissionResponseDto> {
    // transform to Permission entity
    const permission = plainToInstance(Permission, createPermissionReqDto);

    // insert permission
    await this.permissionsRepository.insert(permission);

    return plainToInstance(PermissionResponseDto, permission);
  }

  async getListByQuery() {
    return this.permissionsRepository.find({
      relations: {
        creator: true,
      },
    });
  }
}
