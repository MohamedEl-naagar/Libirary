import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
// import { JWTUserGuard } from 'src/auth/guards/jwt.guard';
@Controller('book')
export class BookController {
  constructor(private _bookService: BookService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this._bookService.findAll(query);
  }

  // @UseGuards(JWTUserGuard)
  @Post('add')
  async addBook(@Body() book: CreateBookDto): Promise<Book> {
    return this._bookService.create(book);
  }

  @Get(':id')
  async findById(@Param('id') _id: string): Promise<Book> {
    return this._bookService.findById(_id);
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this._bookService.updateById(id, book);
  }
}
