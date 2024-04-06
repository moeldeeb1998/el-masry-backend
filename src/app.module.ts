import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validate';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';

@Module({
  imports: [
    // load and validate .env file
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    // connect to DB
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      dialectOptions: {
        useUtC: true, // for reading from database
      },
      models: [User],
    }),
    LoggerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
