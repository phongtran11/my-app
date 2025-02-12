import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  getSubject(subject: string) {
    const prefix = 'Dầu nhớt Thanh Tuyền - ';
    return `${prefix} ${subject}`;
  }

  async sendEmailVerification(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: this.getSubject('Xác thực tài khoản'),
      template: 'email-verification',
      context: {
        email,
        token,
      },
    });
  }
}
