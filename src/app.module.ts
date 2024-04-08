import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { env, validate } from './configs/env';
import { entities } from './configs/entities.typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';

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
      entities,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    if (env.APP.ENV == 'PROD') {
      this.dataSource.runMigrations();
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
