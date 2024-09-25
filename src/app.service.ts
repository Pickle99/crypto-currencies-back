import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('AppServiceModule console log');
    return 'Hello NestJS!';
  }
}
