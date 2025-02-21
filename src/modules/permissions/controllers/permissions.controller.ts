import { Controller, Post, Body, Get } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import {
  CreatePermissionRequestDto,
  CreatePermissionResponseDto,
  PermissionResponseDto,
} from '../dto/create-permission.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BaseErrorResponseDto } from 'src/shared/bases/base-response.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePermissionResponseDto })
  @ApiBadRequestResponse({ type: BaseErrorResponseDto })
  create(
    @Body() createPermissionReqDto: CreatePermissionRequestDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionsService.create(createPermissionReqDto);
  }

  @Get()
  @Public()
  getListByQuery() {
    return this.permissionsService.getListByQuery();
  }
}
