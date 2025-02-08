import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONFIG, DB_CONFIG_TOKEN } from './configs/db.config';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DB_CONFIG],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(DB_CONFIG_TOKEN),
    }),
    AuthModule,
    UsersModule,
    PasswordModule,
  ],
})
export class AppModule {}
