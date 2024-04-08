import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { AdminSeeder } from './users/admin.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private logger: LoggerService,
    private adminSeeder: AdminSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
    this.logger.info('DB seeding is Done');
  }

  async seed() {
    await this.adminSeeder.seed();
  }

  healthChecker(): string {
    return 'It Works!';
  }
}
