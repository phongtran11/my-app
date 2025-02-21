import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { PasswordService } from '../../password/password.service';
import { MailService } from '../../mail/mail.service';
import { LoginReqDto } from '../dtos/login.dto';
import { RegisterReqDto } from '../dtos/register.dto';
import { VerifyEmailReqDto } from '../dtos/register.dto';
import { RefreshTokenReqDto } from '../dtos/refresh-token.dto';
import { BadRequestException } from '@nestjs/common';
import { USER_STATUSES } from '../../user/constants/user_status.constant';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { UsersRepository } from 'src/modules/user/repository/users.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;
  let passwordService: PasswordService;
  let mailService: MailService;
  let clsService: ClsService;

  const user: User = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    status: USER_STATUSES.ACTIVE,
    fullName: 'Test User',
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    createdBy: '1',
    updatedBy: '1',
    deletedBy: '1',
    role: null,
  };

  const registerReqDto: RegisterReqDto = {
    fullName: 'Test User',
    password: 'password',
    confirmPassword: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByEmail: jest.fn(),
            isEmailExists: jest.fn(),
            create: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            compare: jest.fn(),
            hash: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendEmailVerification: jest.fn(),
          },
        },
        {
          provide: ClsService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
    passwordService = module.get<PasswordService>(PasswordService);
    mailService = module.get<MailService>(MailService);
    clsService = module.get<ClsService>(ClsService);
  });

  describe('login', () => {
    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(usersRepository, 'findOneByEmail').mockResolvedValue(null);

      const loginReqDto: LoginReqDto = {
        email: 'test@example.com',
        password: 'password',
      };

      await expect(authService.login(loginReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return tokens if login is successful', async () => {
      jest.spyOn(usersRepository, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(passwordService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'generateToken').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      const loginReqDto: LoginReqDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const result = await authService.login(loginReqDto);

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });

  describe('verifyEmail', () => {
    it('should throw BadRequestException if email already exists', async () => {
      jest.spyOn(usersRepository, 'isEmailExists').mockResolvedValue(true);

      const verifyEmailReqDto: VerifyEmailReqDto = {
        email: 'test@example.com',
      };

      await expect(authService.verifyEmail(verifyEmailReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return success if email verification is successful', async () => {
      jest.spyOn(usersRepository, 'isEmailExists').mockResolvedValue(false);
      jest.spyOn(usersRepository, 'create').mockReturnValue(user);
      jest.spyOn(usersRepository, 'insert').mockResolvedValue(undefined);
      jest.spyOn(authService, 'generateToken').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest
        .spyOn(mailService, 'sendEmailVerification')
        .mockResolvedValue(undefined);

      const verifyEmailReqDto: VerifyEmailReqDto = {
        email: 'test@example.com',
      };
      const result = await authService.verifyEmail(verifyEmailReqDto);
      expect(result).toEqual(true);
    });
  });

  describe('register', () => {
    it('should throw BadRequestException if user not found', async () => {
      jest
        .spyOn(clsService, 'get')
        .mockReturnValue({ email: 'test@example.com' });
      jest.spyOn(usersRepository, 'findOneByEmail').mockResolvedValue(null);

      await expect(authService.register(registerReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if user has active status', async () => {
      jest
        .spyOn(clsService, 'get')
        .mockReturnValue({ email: 'test@example.com' });
      jest.spyOn(usersRepository, 'findOneByEmail').mockResolvedValue(user);

      await expect(authService.register(registerReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return tokens if registration is successful', async () => {
      jest
        .spyOn(clsService, 'get')
        .mockReturnValue({ email: 'test@example.com' });
      jest
        .spyOn(usersRepository, 'findOneByEmail')
        .mockResolvedValue({ ...user, status: USER_STATUSES.VERIFYING_EMAIL });
      jest.spyOn(passwordService, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(usersRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(authService, 'generateToken').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      const result = await authService.register(registerReqDto);

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });

  describe('refreshToken', () => {
    it('should return tokens if refresh token is valid', async () => {
      jest
        .spyOn(jwtService, 'verify')
        .mockReturnValue({ email: 'test@example.com' });
      jest.spyOn(usersRepository, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(authService, 'generateToken').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      const refreshTokenReqDto: RefreshTokenReqDto = {
        refreshToken: 'validRefreshToken',
      };
      const result = await authService.refreshToken(refreshTokenReqDto);

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });
});
