import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONFIG, DB_CONFIG_TOKEN } from './configs/db.config';
import { PasswordModule } from './modules/password/password.module';
import { MailModule } from './modules/mail/mail.module';
import { ClsModule } from 'nestjs-cls';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { TransformResponseInterceptor } from './shared/interceptors/transform-response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CatchEverythingFilter } from './shared/filters/catch-everything.filter';
import { LoggerModule } from 'nestjs-pino';
import { BaseEntitySubscriber } from './shared/subscribers/base-entity.subscriber';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DB_CONFIG],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(DB_CONFIG_TOKEN),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    AuthModule,
    UsersModule,
    PasswordModule,
    MailModule,
    RolesModule,
    PermissionsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    BaseEntitySubscriber,
  ],
})
export class AppModule {}
