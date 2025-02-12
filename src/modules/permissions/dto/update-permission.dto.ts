import { PartialType } from '@nestjs/swagger';
import { CreatePermissionReqDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionReqDto) {}
