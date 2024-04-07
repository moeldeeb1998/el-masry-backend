import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return 'This action returns all users';
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  create(createUserDto: CreateUserDto) {
    return `this action adds a new user ${JSON.stringify(createUserDto)}`;
  }

  update(id: string, updatedUserDto: UpdateUserDto) {
    return `This action update a #${id} with the following data ${JSON.stringify(updatedUserDto)}`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
