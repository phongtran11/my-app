import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { BaseSuccessResponseDto } from 'src/shared/bases/base-response.dto';
import { Match } from 'src/shared/decorators/match.decorator';
import { TokensResDto } from './token.dto';

export class VerifyEmailReqDto {
  @ApiProperty({
    example: 'john@yopmail.com',
  })
  @IsEmail()
  email: string;
}

export class VerifyEmailResDto extends BaseSuccessResponseDto<boolean> {
  @ApiProperty({
    example: true,
  })
  data: true;
}

export class RegisterReqDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'password',
  })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty({
    example: 'password',
  })
  @Match('password')
  confirmPassword: string;
}

export class RegisterResDto extends BaseSuccessResponseDto<TokensResDto> {
  @ApiProperty({
    type: TokensResDto,
  })
  data: TokensResDto;
}
