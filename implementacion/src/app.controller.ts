import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MathHealthService } from './math/math-health.service';
import { ChatService } from './chat/chat.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mathHealthService: MathHealthService,
    private readonly chatService: ChatService,
  ) {}
  @Get('chat-health')
  async chatHealth() {
    return await this.chatService.healthCheck();
  }
  @Get('math-health')
  async mathHealth() {
    return await this.mathHealthService.health();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return { status: 'gateway alive' };
  }
}

