import { Module } from '@nestjs/common';
import { User } from '../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [TypeOrmModule],
})
export class UserModule {}
