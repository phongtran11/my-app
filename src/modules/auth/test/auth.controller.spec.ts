import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { LoginReqDto, LoginResDto } from 'src/modules/auth/dtos/login.dto';
import {
  RegisterReqDto,
  RegisterResDto,
  VerifyEmailResDto,
} from 'src/modules/auth/dtos/register.dto';
import { RefreshTokenReqDto } from 'src/modules/auth/dtos/refresh-token.dto';
import { VerifyEmailReqDto } from 'src/modules/auth/dtos/register.dto';
import { AuthService } from '../services/auth.service';

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
      const result: LoginResDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginReqDto)).toBe(result);
    });
  });

  describe('register', () => {
    it('should return a RegisterResDto', async () => {
      const registerReqDto: RegisterReqDto = {
        fullName: 'john doe',
        password: 'password',
        confirmPassword: 'password',
      };
      const result: RegisterResDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await authController.register(registerReqDto)).toBe(result);
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
    });
  });

  describe('verifyEmail', () => {
    it('should verify email', async () => {
      const verifyEmailReqDto: VerifyEmailReqDto = {
        email: 'john@gmail.com',
      };
      const result: VerifyEmailResDto = { email: 'john@gmail.com' };

      jest.spyOn(authService, 'verifyEmail').mockResolvedValue(result);

      expect(await authController.verifyEmail(verifyEmailReqDto)).toBe(result);
    });
  });
});
