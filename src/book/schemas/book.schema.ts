import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  FANTASY = 'Fantasy',
}
@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, isRequired: true })
  title: string;

  @Prop({isRequired:true})
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
