import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ValidationPipe } from '@nestjs/common';

const customeLogger = new LoggerService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: customeLogger,
  });
  app.useGlobalPipes(
    // validate DTOs
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.APP_PORT || 3000, () => {
    customeLogger.info(
      `App started at ${process.env.APP_HOST}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
