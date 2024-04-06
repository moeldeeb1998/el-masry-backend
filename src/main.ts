import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

const customeLogger = new LoggerService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: customeLogger,
  });
  await app.listen(process.env.APP_PORT || 3000, () => {
    customeLogger.info(
      `App started at ${process.env.APP_HOST}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
