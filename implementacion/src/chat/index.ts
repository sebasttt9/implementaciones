import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  await app.listen(3010);
  console.log('WebSocket server corriendo en http://localhost:3010');
}

bootstrap();
