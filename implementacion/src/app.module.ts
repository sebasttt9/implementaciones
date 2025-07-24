import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import { MathHealthService } from './math/math-health.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatService } from './chat/chat.service';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BookModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([ 
      { 
        name: 'CHAT_SERVICE', 
        transport: Transport.TCP, 
        options: { 
          host: '127.0.0.1', 
          port: 3010, 
        }, 
      }, 
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, MathHealthService, ChatService],
})
export class AppModule {}
