import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject('SERVICE_CLIENT') private client: ClientProxy) {}

  sendMessage(pattern: any, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
