import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_time' })
  getHora(): string {
    return new Date().toLocaleTimeString(); 
  }

  @MessagePattern({ cmd: 'health' })
  health() {
    return { status: 'microservice alive' };
  }
}