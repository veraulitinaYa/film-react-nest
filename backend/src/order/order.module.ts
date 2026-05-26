import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { FilmEntity } from '../films/entities/film.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';

import { OrderEntity } from './entities/order.entity';
import { TicketEntity } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FilmEntity,
      ScheduleEntity,
      OrderEntity,
      TicketEntity,
    ]),
  ],

  controllers: [OrderController],

  providers: [OrderService],
})
export class OrderModule {}