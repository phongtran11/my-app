import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/users.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';
import { AuthService } from './auth.service';
import { PasswordModule } from '../password/password.module';
import { JwtAuthGuard } from './jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get(CONFIG_NAMES.JWT_SECRET),
        };
      },
    }),
    UsersModule,
    PasswordModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
