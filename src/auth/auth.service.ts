import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash, isMatch } from '../utils/encrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResource } from './resource/login.resource';
import { JWTPayload } from './dto/jwt-payload.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import RoleNames from '../models/enums/RoleNames';
import { env } from '../configs/env';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getTokens(email: string, role: RoleNames) {
    const jwtPayload: JWTPayload = { email: email, role: role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: env.SECRETS.JWT_ACCESS_SECRET,
        expiresIn: `${env.SECRETS.JWT_ACCESS_EXPIRY}m`,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: env.SECRETS.JWT_REFRESH_SECRET,
        expiresIn: `${env.SECRETS.JWT_REFRESH_EXPIRY}d`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.updateRefreshToken(email, hashedRefreshToken);
  }

  // it is only for users not admins
  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  async login(email: string, password: string): Promise<LoginResource> {
    const user = await this.usersService.findOneBy({ email });

    // User not found or password not match
    if (!user || !(await isMatch(password, user.password)))
      throw new UnauthorizedException('Invalid email or password');

    const tokens = await this.getTokens(user.email, user.role);
    await this.updateRefreshToken(user.email, tokens.refreshToken);

    return LoginResource.generate(
      user,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }

  async logout(email: string) {
    await this.usersService.updateRefreshToken(email, null);
  }

  async refreshTokens(email: string, refreshToken: string) {
    const user = await this.usersService.findOneBy({ email });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await isMatch(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.email, user.role);

    await this.updateRefreshToken(user.email, tokens.refreshToken);

    return tokens;
  }
}
