import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { env, validate } from './configs/env';

@Module({
  imports: [
    // configure logger
    LoggerModule,
    // load and validate .env file
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    // connect to DB
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      username: env.DATABASE.USERNAME,
      password: env.DATABASE.PASSWORD,
      database: env.DATABASE.NAME,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
