import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../models/test.entity';
import {
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private testRepository: Repository<Test>,
  ) {}

  async findAll(options?: FindManyOptions<Test>) {
    return await this.testRepository.find({
      ...options,
      order: { createdAt: 'DESC' },
    });
  }

  async findOneBy(where: FindOptionsWhere<Test> | FindOptionsWhere<Test>[]) {
    return await this.testRepository.findOneBy(where);
  }

  async update(entity: Partial<Test>, options?: SaveOptions | undefined) {
    return await this.testRepository.save(entity, options);
  }

  async createBulk(tests: Partial<Test>[]) {
    const result = await this.testRepository
      .createQueryBuilder()
      .insert()
      .into(Test)
      .values(tests)
      .orIgnore()
      .returning('*')
      .execute();
    return result;
  }

  async deactivate(id: string) {
    const test = await this.findOneBy({ id });

    if (!test) throw new NotFoundException();

    test.isActive = false;

    return await this.update(test);
  }
}
