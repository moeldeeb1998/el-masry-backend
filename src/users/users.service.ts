import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectId,
  QueryFailedError,
  Repository,
  SaveOptions,
} from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../utils/encrypt';
import RoleNames from '../models/enums/RoleNames';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // TypeORM methos
  async findAll(options?: FindManyOptions<User>) {
    return await this.userRepository.find(options);
  }

  async findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return await this.userRepository.findOneBy(where);
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

  private async update(
    entity: Partial<User>,
    options?: SaveOptions | undefined,
  ) {
    return await this.userRepository.save(entity, options);
  }

  private async delete(
    criteria:
      | string
      | number
      | FindOptionsWhere<User>
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[],
  ) {
    return await this.userRepository.delete(criteria);
  }

  // Custom Methos For Admin Role
  async countAdmins() {
    return await this.userRepository.countBy({
      role: RoleNames.ADMIN,
    });
  }

  async findAllAdmins() {
    return await this.findAll({ where: { role: RoleNames.ADMIN } });
  }

  async findAdmin(id: string) {
    return await this.findOneBy({ id, role: RoleNames.ADMIN });
  }

  async createAdmin(dto: CreateUserDto) {
    const adminData: Partial<User> = { ...dto, role: RoleNames.ADMIN };
    return await this.create(adminData);
  }

  async updateAdmin(id: string, updatedUserDto: UpdateUserDto) {
    const user: Partial<User> = updatedUserDto;
    user.id = id;

    const oldUserData = await this.findOneBy({ id, role: RoleNames.ADMIN });

    if (!oldUserData) throw new NotFoundException('Admin Not Found');

    return await this.update(user);
  }

  async removeAdmin(id: string) {
    const admin = await this.findAdmin(id);
    if (!admin) throw new NotFoundException('Admin Not Found');

    const adminCounter = await this.countAdmins();

    if (adminCounter > 1) {
      return await this.delete(id);
    }

    throw new ForbiddenException('System Must Has At Least One Admin');
  }

  // Custom Methos For User Role
  async createUser(dto: CreateUserDto) {
    const userData: Partial<User> = { ...dto, role: RoleNames.USER };
    return await this.create(userData);
  }

  // Custom Methods For All Users
  async countAll() {
    return await this.userRepository.count();
  }

  async updateRefreshToken(email: string, refreshToken: string | null) {
    const user = await this.findOneBy({ email });
    if (!user) throw new Error('User Not found');
    user.refreshToken = refreshToken !== null ? refreshToken : '';
    return await this.update(user);
  }
}
