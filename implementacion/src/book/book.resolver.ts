import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  books(): Book[] {
    return this.bookService.findAll();
  }

  @Query(() => Book, { nullable: true })
  book(@Args('id', { type: () => Int }) id: number): Book {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  addBook(
    @Args('title') title: string,
    @Args('author') author: string,
  ): Book {
    return this.bookService.create(title, author);
  }
}
