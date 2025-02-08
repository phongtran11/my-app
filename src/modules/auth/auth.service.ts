import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../password/password.service';
import {
  LoginReqDto,
  LoginResDto,
  RegisterReqDto,
  RegisterResDto,
} from './auth.dto';
import { UsersRepository } from '../user/users.repository';
import { ERROR_MESSAGES } from 'src/shared/constants/error-messages.constant';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    // find user with email
    const user = await this.userRepository.findOneByEmail(loginReqDto.email);

    // validate password
    await this.validatePassword(loginReqDto.password, user?.password);

    // generate access and refresh tokens
    const tokens = this.generateToken(user);

    // return tokens as response
    return plainToInstance(LoginResDto, tokens);
  }

  async register(registerReqDto: RegisterReqDto): Promise<RegisterResDto> {
    // find user with email
    const user = await this.userRepository.findOneByEmail(registerReqDto.email);

    // throw exception if user already exists
    if (user) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    // create a new user
    const userEntity = this.userRepository.create({
      email: registerReqDto.email,
      password: await this.passwordService.hash(registerReqDto.password),
    });

    // save the user to the database
    await this.userRepository.insert(userEntity);

    // generate access and refresh tokens
    const tokens = this.generateToken(userEntity);

    // return tokens as response
    return plainToInstance(RegisterResDto, tokens);
  }

  async validatePassword(password: string, passwordHash: string) {
    // validate plain password with hash password
    const isMatchPassword = await this.passwordService.compare(
      password,
      passwordHash,
    );

    // throw exception if password is not match
    if (!isMatchPassword) {
      throw new UnauthorizedException(ERROR_MESSAGES.LOGIN_FAILED);
    }
  }

  generateToken(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    // Payload for token generation
    const payload = { email: user.email, sub: user.id };

    // Generate access token
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get(CONFIG_NAMES.JWT_EXPIRATION_TIME),
    });

    // Generate refresh token
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get(
        CONFIG_NAMES.JWT_REFRESH_EXPIRATION_TIME,
      ),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
