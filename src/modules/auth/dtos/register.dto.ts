import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';
import { TokensResDto } from './token.dto';

export class VerifyEmailReqDto {
  @ApiProperty({
    example: 'john@yopmail.com',
  })
  @IsEmail()
  email: string;
}

export class VerifyEmailResDto {
  @ApiProperty({
    example: 'john@yopmail.com',
  })
  email: string;
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

export class RegisterResDto extends TokensResDto {}
