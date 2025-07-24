import { Controller, Post, Body } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('dynamic')
  async dynamic(@Body() body: { pattern: any; payload: any; transport: string; host: string; port: number }) {
    console.log('BODY RECIBIDO:', body);
    // Normaliza el campo transport a mayúsculas
    const transport = (body.transport || '').toUpperCase();
    // Permite pattern como string o como objeto { cmd: '...' }
    const pattern = typeof body.pattern === 'string' ? body.pattern : body.pattern;
    return this.gatewayService.sendMessage(pattern, {
      ...body.payload,
      transport,
      host: body.host,
      port: body.port,
    });
  }
}
