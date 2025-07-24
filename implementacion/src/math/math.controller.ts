import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MathService } from './math.service';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern({ cmd: 'sum' })
  sum(data: { a: number; b: number }): number {
    return this.mathService.sum(data.a, data.b);
  }

  @MessagePattern({ cmd: 'multiply' })
  multiply(data: { a: number; b: number }): number {
    return this.mathService.multiply(data.a, data.b);
  }

  @MessagePattern({ cmd: 'health' })
  health() {
    return { status: 'math microservice alive' };
  }
}
