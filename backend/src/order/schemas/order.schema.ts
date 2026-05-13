import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  film: string;

  @Prop()
  session: string;

  @Prop()
  daytime: string;

  @Prop()
  row: number;

  @Prop()
  seat: number;

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);