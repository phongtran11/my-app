import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ClsService } from 'nestjs-cls';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_USER } from 'src/shared/constants/cls.constant';
import { CONFIG_NAMES } from 'src/shared/constants/config.constant';
import { JwtUser } from 'src/shared/types/cls.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly clsService: ClsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG_NAMES.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    // set user in cls (continue local storage)
    this.clsService.set<JwtUser>(JWT_USER, {
      userId: payload.sub,
      email: payload.email,
    });

    return { userId: payload.sub, email: payload.email };
  }
}
