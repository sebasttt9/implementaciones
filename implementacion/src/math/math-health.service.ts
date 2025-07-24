import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class MathHealthService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MATH_HOST || '127.0.0.1',
        port: parseInt(process.env.MATH_PORT || '3006', 10),
      },
    });
  }

  async health(): Promise<any> {
    return this.client.send({ cmd: 'health' }, {}).toPromise();
  }
}
