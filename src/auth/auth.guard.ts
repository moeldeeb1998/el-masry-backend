import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomRequest } from '../types/custom-request';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { env } from '../configs/env';
import { JWTPayload } from './dto/jwt-payload.dto';
import { UsersService } from '../users/users.service';
import { User } from '../models/user.entity';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // handle logic of SkipAuth decorator
    const isPUblic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPUblic) return true;

    // handle logic of AuthGuard decorator
    // which is global now we don't need to use it
    // it is used by default
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
        secret: env.SECRETS.JWT,
      });
      const loggedInUser = (await this.usersService.findOneBy({
        email: payload.email,
        role: payload.role,
      })) as User;
      // Inject Logged in user
      request.user = loggedInUser;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token is expired');
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: CustomRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
