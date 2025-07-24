import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { BookModule } from './book/book.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const host = process.env.TCP_HOST || '127.0.0.1';
  const port = 3002; 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BookModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  });
  await app.listen();
  console.log(`Microservicio de libros escuchando en ${host}:${port}`);
}
bootstrap();