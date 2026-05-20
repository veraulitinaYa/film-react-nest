import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { FilmEntity } from '../films/entities/film.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FilmEntity,
      ScheduleEntity,
    ]),
  ],

  controllers: [OrderController],

  providers: [OrderService],
})
export class OrderModule {}