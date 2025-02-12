import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionReqDto } from '../dto/create-permission.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BaseCreatedResDto } from 'src/shared/bases/base.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: BaseCreatedResDto,
  })
  create(@Body() createPermissionReqDto: CreatePermissionReqDto) {
    return this.permissionsService.create(createPermissionReqDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
