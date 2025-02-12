import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { LoginResDto, LoginReqDto } from '../dtos/login.dto';
import {
  RefreshTokenReqDto,
  RefreshTokenResDto,
} from '../dtos/refresh-token.dto';
import {
  VerifyEmailReqDto,
  RegisterResDto,
  RegisterReqDto,
  VerifyEmailResDto,
} from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiCreatedResponse({
    type: LoginResDto,
  })
  login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto);
  }

  @Post('verify-email')
  @Public()
  @ApiCreatedResponse({
    type: VerifyEmailResDto,
  })
  verifyEmail(
    @Body() verifyEmailReqDto: VerifyEmailReqDto,
  ): Promise<VerifyEmailResDto> {
    return this.authService.verifyEmail(verifyEmailReqDto);
  }

  @Post('register')
  @ApiCreatedResponse({
    type: RegisterResDto,
  })
  register(@Body() registerReqDto: RegisterReqDto): Promise<RegisterResDto> {
    return this.authService.register(registerReqDto);
  }

  @Post('refresh-token')
  @Public()
  @ApiCreatedResponse({
    type: RefreshTokenResDto,
  })
  refreshToken(
    @Body() refreshTokenReqDto: RefreshTokenReqDto,
  ): Promise<RefreshTokenResDto> {
    return this.authService.refreshToken(refreshTokenReqDto);
  }
}
