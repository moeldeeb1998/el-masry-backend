import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthChecker(): string {
    return 'It Works!';
  }
}
