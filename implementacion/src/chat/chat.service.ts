import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

@MessagePattern({ cmd: 'chat_health' })
healthCheck() {
  return { status: 'ok', service: 'chat' };
}
  
}
