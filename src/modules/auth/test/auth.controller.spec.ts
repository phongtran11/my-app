import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { LoginReqDto } from 'src/modules/auth/dtos/login.dto';
import { RegisterReqDto } from 'src/modules/auth/dtos/register.dto';
import { RefreshTokenReqDto } from 'src/modules/auth/dtos/refresh-token.dto';
import { VerifyEmailReqDto } from 'src/modules/auth/dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { BadRequestException } from '@nestjs/common';
import { TokensResDto } from '../dtos/token.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            refreshToken: jest.fn(),
            verifyEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a LoginResDto', async () => {
      const loginReqDto: LoginReqDto = {
        email: 'john@gmail.com',
        password: 'password',
      };
      const result: TokensResDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginReqDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(loginReqDto);
    });

    it('should throw BadRequestException if login fails', async () => {
      const loginReqDto: LoginReqDto = {
        email: 'john@gmail.com',
        password: 'password',
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new BadRequestException());

      await expect(authController.login(loginReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('register', () => {
    it('should return a RegisterResDto', async () => {
      const registerReqDto: RegisterReqDto = {
        fullName: 'john doe',
        password: 'password',
        confirmPassword: 'password',
      };
      const result: TokensResDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await authController.register(registerReqDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(registerReqDto);
    });

    it('should throw BadRequestException if registration fails', async () => {
      const registerReqDto: RegisterReqDto = {
        fullName: 'john doe',
        password: 'password',
        confirmPassword: 'password',
      };

      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new BadRequestException());

      await expect(authController.register(registerReqDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('refreshToken', () => {
    it('should return a new access token', async () => {
      const refreshTokenReqDto: RefreshTokenReqDto = { refreshToken: 'token' };
      const result = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(authService, 'refreshToken').mockResolvedValue(result);

      expect(await authController.refreshToken(refreshTokenReqDto)).toBe(
        result,
      );
      expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenReqDto);
    });

    it('should throw BadRequestException if refresh token fails', async () => {
      const refreshTokenReqDto: RefreshTokenReqDto = { refreshToken: 'token' };

      jest
        .spyOn(authService, 'refreshToken')
        .mockRejectedValue(new BadRequestException());

      await expect(
        authController.refreshToken(refreshTokenReqDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email', async () => {
      const verifyEmailReqDto: VerifyEmailReqDto = {
        email: 'john@gmail.com',
      };
      const result = undefined;

      jest.spyOn(authService, 'verifyEmail').mockResolvedValue(result);

      expect(await authController.verifyEmail(verifyEmailReqDto)).toBe(result);
      expect(authService.verifyEmail).toHaveBeenCalledWith(verifyEmailReqDto);
    });

    it('should throw BadRequestException if email verification fails', async () => {
      const verifyEmailReqDto: VerifyEmailReqDto = {
        email: 'john@gmail.com',
      };

      jest
        .spyOn(authService, 'verifyEmail')
        .mockRejectedValue(new BadRequestException());

      await expect(
        authController.verifyEmail(verifyEmailReqDto),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
