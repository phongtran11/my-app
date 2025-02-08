import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';

@Injectable()
export class PasswordService {
  private pepper: string;

  constructor(private readonly configService: ConfigService) {
    this.pepper = this.configService.get(CONFIG_NAMES.PEPPER_SECRET);
  }

  async hash(password: string): Promise<string> {
    const pepperedPassword = password + this.pepper;
    return await argon2.hash(pepperedPassword);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const pepperedPassword = password + this.pepper;
    return await argon2.verify(hash, pepperedPassword);
  }
}
