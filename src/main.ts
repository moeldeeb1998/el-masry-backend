import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { env } from './configs/env';

const logger = new LoggerService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.useGlobalPipes(
    // validate DTOs
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(env.APP.PORT, () => {
    logger.info(`App started at http://localhost:${env.APP.PORT}`);
  });
}
bootstrap();
