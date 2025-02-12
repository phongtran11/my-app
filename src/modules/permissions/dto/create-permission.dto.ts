import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePermissionReqDto {
  @ApiProperty({
    example: 'products',
  })
  @IsString()
  resourceName: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  create: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  read: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  update: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  delete: boolean;
}
