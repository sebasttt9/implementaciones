import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessagePattern } from '@nestjs/microservices';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true }) 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map(); 
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    const username = this.users.get(client.id);
    if (username) {
      client.broadcast.emit('user_left', username);
      this.users.delete(client.id);
      this.emitUserList();
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(`Mensaje recibido: ${message}`);
    this.server.emit('message', message);
  }

  @SubscribeMessage('user_joined')
  handleUserJoined(client: Socket, username: string) {
    this.users.set(client.id, username);
    client.broadcast.emit('user_joined', username);
    this.emitUserList();
  }

  // Emitir la lista de usuarios conectados a todos
  private emitUserList() {
    const userList = Array.from(this.users.values());
    this.server.emit('user_list', userList);
  }

  // Handler para health-check TCP desde la gateway
  @MessagePattern({ cmd: 'chat_health' })
  healthCheck() {
    return { status: 'ok', service: 'chat' };
  }
}
