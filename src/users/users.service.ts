import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../utils/encrypt';
import RoleNames from '../models/enums/RoleNames';

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

  private async create(dto: Partial<User>) {
    try {
      const newUser: Partial<User> = dto;
      newUser.password = await hash(dto.password as string);
      const createdUser = await this.userRepository.save(newUser);
      return createdUser;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new UnprocessableEntityException('Email already exists');
      } else {
        throw error;
      }
    }
  }

  async createAdmin(dto: CreateUserDto) {
    const adminData: Partial<User> = { ...dto, role: RoleNames.ADMIN };
    return await this.create(adminData);
  }

  update(id: string, updatedUserDto: UpdateUserDto) {
    return `This action update a #${id} with the following data ${JSON.stringify(updatedUserDto)}`;
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async countAdmins() {
    return await this.userRepository.countBy({
      role: RoleNames.ADMIN,
    });
  }

  async countAll() {
    return await this.userRepository.count();
  }
}
