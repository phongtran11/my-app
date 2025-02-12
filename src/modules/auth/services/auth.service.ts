import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { MailService } from 'src/modules/mail/mail.service';
import { PasswordService } from 'src/modules/password/password.service';
import { USER_STATUSES } from 'src/modules/user/constants/user_status.constant';
import { User } from 'src/modules/user/entities/user.entity';
import { UsersRepository } from 'src/modules/user/users.repository';
import { JWT_USER } from 'src/shared/constants/cls.constant';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';
import { ERROR_MESSAGES } from 'src/shared/constants/error-messages.constant';
import { JwtUser } from 'src/shared/types/cls.type';
import { LoginReqDto, LoginResDto } from '../dtos/login.dto';
import {
  RefreshTokenReqDto,
  RefreshTokenResDto,
} from '../dtos/refresh-token.dto';
import {
  VerifyEmailReqDto,
  VerifyEmailResDto,
  RegisterReqDto,
  RegisterResDto,
} from '../dtos/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly clsService: ClsService,
  ) {}

  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    // find user with email
    const user = await this.userRepository.findOneByEmail(loginReqDto.email);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.LOGIN_FAILED);
    }

    // validate password
    await this.validatePassword(loginReqDto.password, user.password);

    // generate access and refresh tokens
    const tokens = this.generateToken(user);

    // return tokens as response
    return plainToInstance(LoginResDto, tokens);
  }

  async verifyEmail(
    verifyEmailReqDto: VerifyEmailReqDto,
  ): Promise<VerifyEmailResDto> {
    // check if user with email exists
    const isEmailExists = await this.userRepository.isEmailExists(
      verifyEmailReqDto.email,
    );

    // throw exception if user not found
    if (isEmailExists) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // create a new user
    const user = this.userRepository.create({
      email: verifyEmailReqDto.email,
    });

    // save the user to the database
    await this.userRepository.insert(user);

    // generate access and refresh tokens
    const tokens = this.generateToken(user);

    // send email verification
    await this.mailService.sendEmailVerification(
      verifyEmailReqDto.email,
      tokens.accessToken,
    );

    return {
      email: verifyEmailReqDto.email,
    };
  }

  async register(registerReqDto: RegisterReqDto): Promise<RegisterResDto> {
    // get user from storage
    const jwtUser = this.clsService.get<JwtUser>(JWT_USER);

    // find user with email
    const user = await this.userRepository.findOneByEmail(jwtUser.email);

    // throw exception if user not found
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_NOT_FOUND);
    }

    // throw exception if user has active status
    if (user.status === USER_STATUSES.ACTIVE) {
      throw new BadRequestException(ERROR_MESSAGES.USER_HAS_ACTIVE_STATUS);
    }

    // update user password with hash password
    const hashPassword = await this.passwordService.hash(
      registerReqDto.password,
    );

    // update password, full name and status
    await this.userRepository.update(
      { id: user.id },
      {
        password: hashPassword,
        fullName: registerReqDto.fullName,
        status: USER_STATUSES.ACTIVE,
      },
    );

    // generate access and refresh tokens
    const tokens = this.generateToken(user);

    // return tokens as response
    return plainToInstance(RegisterResDto, tokens);
  }

  async refreshToken(
    refreshTokenReqDto: RefreshTokenReqDto,
  ): Promise<RefreshTokenResDto> {
    const { refreshToken } = refreshTokenReqDto;

    // verify refresh token
    const payload = this.jwtService.verify(refreshToken);

    // find user with email
    const user = await this.userRepository.findOneByEmail(payload.email);

    // generate access and refresh tokens
    const tokens = this.generateToken(user);

    // return tokens as response
    return plainToInstance(RefreshTokenResDto, tokens);
  }

  async validatePassword(password: string, passwordHash: string) {
    // validate plain password with hash password
    const isMatchPassword = await this.passwordService.compare(
      password,
      passwordHash,
    );

    // throw exception if password is not match
    if (!isMatchPassword) {
      throw new BadRequestException(ERROR_MESSAGES.LOGIN_FAILED);
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
