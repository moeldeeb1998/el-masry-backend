import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SkipAuth } from '../decorators/auth.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CustomRequest } from '../types/custom-request';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    return;
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: CustomRequest) {
    if (req.user) {
      await this.authService.logout(req.user.email);
    }
    return;
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@Req() req: CustomRequest) {
    return this.authService.refreshTokens(
      req.user?.email as string,
      req.user?.refreshToken as string,
    );
  }
}
