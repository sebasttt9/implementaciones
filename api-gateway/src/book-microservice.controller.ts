import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class BookMicroserviceController {
  constructor() {}

0
  @MessagePattern({ cmd: 'health' })
  health() {
    return { status: 'microservice alive' };
  }
}
