import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isMatch } from '../utils/encrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResource } from './resource/login.resource';
import { JWTPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResource> {
    const user = await this.usersService.findOneBy({ email });

    // User not found or password not match
    if (!user || !(await isMatch(password, user.password)))
      throw new UnauthorizedException('Invalid email or password');

    const jwtPayload: JWTPayload = { email: user.email, role: user.role };

    const accessToken: string = await this.jwtService.signAsync(jwtPayload);

    return LoginResource.generate(user, accessToken, 'test');
  }
}
