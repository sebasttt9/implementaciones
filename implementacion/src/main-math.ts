import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MathModule } from './math/math.module';

async function bootstrap() {
  const host = process.env.MATH_HOST || '127.0.0.1';
  const port = parseInt(process.env.MATH_PORT || '3006', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MathModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  });
  await app.listen();
  console.log(`math escuchando en ${host}:${port}`);
}
bootstrap();
