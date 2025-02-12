import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { TokensResDto } from './token.dto';

export class LoginReqDto {
  @ApiProperty({
    example: 'john@yopmail.com',
  })
  @IsEmail()
  email: string;

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
}

export class LoginResDto extends TokensResDto {}
