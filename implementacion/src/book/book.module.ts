import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookMicroserviceController } from './book.controller';

@Module({
  providers: [BookService, BookResolver],
  controllers: [BookMicroserviceController],
})
export class BookModule {}