import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ChatController {
  @MessagePattern({ cmd: 'chat_health' })
  healthCheck() {
    return { status: 'ok', service: 'chat' };
  }
}