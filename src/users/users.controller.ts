import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUUID } from '../utils/validator';
import { UserResource } from './resource/user.resource';
import { User } from '../models/user.entity';
import { Response } from 'express';
import { Roles } from '../decorators/auth.decorator';
import RoleNames from '../models/enums/RoleNames';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admins')
  @Roles(RoleNames.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async findAllAdmins() {
    const admins = await this.usersService.findAllAdmins();
    return admins.map((admin) => {
      return UserResource.fromUser(admin);
    });
  }

  @Get('admins/:id')
  async findAdmin(@Param('id') id: string) {
    const uuidValidation = validateUUID(id);
    if (!uuidValidation.status)
      throw new BadRequestException(uuidValidation.message);

    const admin = await this.usersService.findAdmin(id);

    if (!admin) throw new NotFoundException(`User not found`);

    return UserResource.fromUser(admin);
  }

  @Post('admins')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const createdUser: User =
      await this.usersService.createAdmin(createUserDto);

    return UserResource.fromUser(createdUser);
  }

  @Patch('admins/:id')
  async updateAdmin(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const uuidValidation = validateUUID(id);
    if (!uuidValidation.status)
      throw new BadRequestException(uuidValidation.message);
    await this.usersService.updateAdmin(id, updateUserDto);

    // return No Content
    return res.status(204).end();
  }

  @Delete('admins/:id')
  async removeAdmin(@Res() res: Response, @Param('id') id: string) {
    const uuidValidation = validateUUID(id);
    if (!uuidValidation.status)
      throw new BadRequestException(uuidValidation.message);

    await this.usersService.removeAdmin(id);
    // return No Content
    return res.status(204).end();
  }
}
