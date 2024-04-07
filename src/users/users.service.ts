import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../utils/encrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await hash(createUserDto.password);
    return this.userRepository.save(createUserDto);
  }

  update(id: string, updatedUserDto: UpdateUserDto) {
    return `This action update a #${id} with the following data ${JSON.stringify(updatedUserDto)}`;
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
