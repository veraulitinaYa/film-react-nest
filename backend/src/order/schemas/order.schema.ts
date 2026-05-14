import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ticket, TicketSchema } from './ticket.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop() email: string;

  @Prop() phone: string;

  @Prop({ type: [TicketSchema], default: [] })
  tickets: Ticket[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);