import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Ticket {
  @Prop() film: string;
  @Prop() session: string;
  @Prop() row: number;
  @Prop() seat: number;
  @Prop() price: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);