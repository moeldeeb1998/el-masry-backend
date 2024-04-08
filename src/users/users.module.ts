import { Module } from '@nestjs/common';
import { User } from '../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AdminSeeder } from './admin.seeder';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, User, AdminSeeder],
  exports: [TypeOrmModule, AdminSeeder],
})
export class UsersModule {}
