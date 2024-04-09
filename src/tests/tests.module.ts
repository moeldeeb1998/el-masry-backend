import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../models/test.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Test])],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
