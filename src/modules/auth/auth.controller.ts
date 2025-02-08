import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginReqDto,
  LoginResDto,
  RegisterReqDto,
  RegisterResDto,
} from './auth.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOkResponse({
    type: LoginResDto,
  })
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto);
  }

  @Post('register')
  @Public()
  async register(
    @Body() registerReqDto: RegisterReqDto,
  ): Promise<RegisterResDto> {
    return this.authService.register(registerReqDto);
  }
}
