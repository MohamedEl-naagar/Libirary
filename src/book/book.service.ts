import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? { title: { $regex: query.keyword, $options: 'i' } }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(book: CreateBookDto): Promise<Book> {
    let newBook = await this.bookModel.create(book);
    return newBook;
  }
  async findById(id: string): Promise<Book> {
    let book = await this.bookModel.findById({ _id: id });
    if (!book) {
      throw new NotFoundException('Book Not Found!');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
}
