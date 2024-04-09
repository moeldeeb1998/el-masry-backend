import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../dto/jwt-payload.dto';
import { env } from '../../configs/env';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.SECRETS.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JWTPayload) {
    return payload;
  }
}
