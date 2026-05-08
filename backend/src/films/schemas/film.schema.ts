import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schedule.schema';

@Schema({
  collection: 'films',
  timestamps: true,
})
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({
    type: [ScheduleSchema],
    default: [],
  })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);