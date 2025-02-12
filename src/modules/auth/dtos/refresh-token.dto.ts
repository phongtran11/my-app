import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginResDto } from './login.dto';

export class RefreshTokenReqDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResDto extends LoginResDto {}
