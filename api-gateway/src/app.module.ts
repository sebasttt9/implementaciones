import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayService } from './gateway/gateway.service';
import { GatewayController } from './gateway/gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    require('@nestjs/microservices').ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: require('@nestjs/microservices').Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3010,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class AppModule { }
