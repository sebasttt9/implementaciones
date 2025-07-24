import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage(pattern: any, payload: any) {
    return this.client.send(pattern, payload).toPromise();
  }
}
