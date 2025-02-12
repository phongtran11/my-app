import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';
import { JWT_USER } from 'src/shared/constants/cls.constant';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;
  let clsService: ClsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('testSecret'),
          },
        },
        {
          provide: ClsService,
          useValue: {
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
    clsService = module.get<ClsService>(ClsService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate and return user payload', async () => {
    const payload = { sub: '1', email: 'test@example.com' };
    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({ userId: '1', email: 'test@example.com' });
    expect(clsService.set).toHaveBeenCalledWith(JWT_USER, {
      userId: '1',
      email: 'test@example.com',
    });
  });

  it('should call configService.get with correct argument', () => {
    expect(configService.get).toHaveBeenCalledWith(CONFIG_NAMES.JWT_SECRET);
  });
});
