import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseSuccessResponseDto } from 'src/shared/bases/base-response.dto';
import { TokensResDto } from './token.dto';
export class RefreshTokenReqDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResDto extends BaseSuccessResponseDto<TokensResDto> {
  @ApiProperty({
    type: TokensResDto,
  })
  data: TokensResDto;
}
