import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @MessagePattern({ cmd: 'health' })
  health() {
    return { status: 'microservice alive' };
  }

  @MessagePattern({ cmd: 'get_time' })
  getTime(): string {
    return new Date().toLocaleTimeString();
  }
}
