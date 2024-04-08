import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { SkipAuth } from './decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {}

  @SkipAuth()
  @Get('/health')
  healthCheck(): string {
    this.logger.log('checking health');
    return this.appService.healthChecker();
  }
}
