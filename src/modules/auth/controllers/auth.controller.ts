import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
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
import { TokensResDto } from '../dtos/token.dto';
import { BaseErrorResponseDto } from 'src/shared/bases/base-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiCreatedResponse({
    type: LoginResDto,
  })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  login(@Body() loginReqDto: LoginReqDto): Promise<TokensResDto> {
    return this.authService.login(loginReqDto);
  }

  @Post('verify-email')
  @Public()
  @ApiCreatedResponse({
    type: VerifyEmailResDto,
  })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  verifyEmail(@Body() verifyEmailReqDto: VerifyEmailReqDto) {
    return this.authService.verifyEmail(verifyEmailReqDto);
  }

  @Post('register')
  @ApiCreatedResponse({
    type: RegisterResDto,
  })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  register(@Body() registerReqDto: RegisterReqDto): Promise<TokensResDto> {
    return this.authService.register(registerReqDto);
  }

  @Post('refresh-token')
  @Public()
  @ApiCreatedResponse({
    type: RefreshTokenResDto,
  })
  @ApiBadRequestResponse({
    type: BaseErrorResponseDto,
  })
  refreshToken(
    @Body() refreshTokenReqDto: RefreshTokenReqDto,
  ): Promise<TokensResDto> {
    return this.authService.refreshToken(refreshTokenReqDto);
  }
}
