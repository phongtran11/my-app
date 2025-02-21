import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import {
  BaseResponseDto,
  BaseSuccessResponseDto,
} from 'src/shared/bases/base-response.dto';

export class CreatePermissionRequestDto {
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

@Exclude()
export class PermissionResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'products',
  })
  @Expose()
  resourceName: string;

  @ApiProperty({
    example: true,
  })
  @Expose()
  create: boolean;

  @ApiProperty({
    example: true,
  })
  @Expose()
  read: boolean;

  @ApiProperty({
    example: true,
  })
  @Expose()
  update: boolean;

  @ApiProperty({
    example: true,
  })
  @Expose()
  delete: boolean;
}

export class CreatePermissionResponseDto extends BaseSuccessResponseDto<PermissionResponseDto> {
  @ApiProperty({
    type: PermissionResponseDto,
  })
  data: PermissionResponseDto;
}
