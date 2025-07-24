import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    return this.books.find(book => book.id === id);
  }

  create(title: string, author: string): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      title,
      author,
    };
    this.books.push(newBook);
    return newBook;
  }
}
