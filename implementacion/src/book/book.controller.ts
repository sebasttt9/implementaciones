import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Controller()
export class BookMicroserviceController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): Book[] {
    return this.bookService.findAll();
  } 

  @MessagePattern({ cmd: 'health' })
  health() {
    return { status: 'microservice alive' };
  }
}