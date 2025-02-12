import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService) => ({
        transport: {
          host: configService.get(CONFIG_NAMES.MAIL_HOST),
          port: configService.get(CONFIG_NAMES.MAIL_PORT),
          secure: false,
          auth: {
            user: configService.get(CONFIG_NAMES.MAIL_USER),
            pass: configService.get(CONFIG_NAMES.MAIL_PASS),
          },
        },
        defaults: {
          from: configService.get(CONFIG_NAMES.MAIL_DEFAULT_FROM),
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: resolve(__dirname, 'templates/partials'),
            options: {
              strict: true,
            },
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
