import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { message: 'API working 🚀' };
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok', message: 'API is healthy' };
  }
}