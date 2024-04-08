import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { env } from '../configs/env';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AdminSeeder {
  constructor(
    private usersService: UsersService,
    private logger: LoggerService,
  ) {}

  async seed() {
    const counter = await this.usersService.countAll();
    if (counter == 0) {
      const userData = {
        firstName: env.ADMIN.FIRSTNAME,
        lastName: env.ADMIN.LASTNAME,
        email: env.ADMIN.EMAIL,
        password: env.ADMIN.PASSWORD,
      };
      await this.usersService.createAdmin(userData as CreateUserDto);
      this.logger.info(`Admin data seeding is done`);
    }
  }
}
