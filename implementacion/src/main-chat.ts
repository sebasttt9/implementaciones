import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3010,
    },
  });
  await app.listen();
  console.log('Microservicio de chat escuchando en 127.0.0.1:3010');
}
bootstrap();