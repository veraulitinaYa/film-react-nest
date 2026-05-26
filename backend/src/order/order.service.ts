import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateOrderDto } from './dto/order.dto';

import { toOrderResponse } from './mappers/order.mapper';

import { OrderEntity } from './entities/order.entity';
import { TicketEntity } from './entities/ticket.entity';

import { FilmEntity } from '../films/entities/film.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,

    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,

    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async create(dto: CreateOrderDto) {

    const preparedTickets: Partial<TicketEntity>[] = [];

    for (const ticket of dto.tickets) {
      const film = await this.filmRepository.findOne({
        where: {
          id: ticket.film,
        },

        relations: ['schedule'],
      });

      if (!film) {
        throw new BadRequestException('Film not found');
      }

      const session = film.schedule.find(
        (s) => s.id === ticket.session,
      );

      if (!session) {
        throw new BadRequestException('Session not found');
      }

      const place = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(place)) {
        throw new BadRequestException('Seat already taken');
      }

      session.taken.push(place);

      await this.scheduleRepository.save(session);
    


    preparedTickets.push({
      ...ticket,

      daytime: session.daytime,
    });
  }


    const order = this.orderRepository.create({
      email: dto.email,
      phone: dto.phone,
    });

    const savedOrder = await this.orderRepository.save(order);

    const tickets = preparedTickets.map((ticket) =>
      this.ticketRepository.create({
        ...ticket,
        
        order: savedOrder,
      }),
    );

    await this.ticketRepository.save(tickets);

    const fullOrder = await this.orderRepository.findOne({
      where: {
        id: savedOrder.id,
      },

      relations: ['tickets'],
    });

    return {
      total: fullOrder?.tickets.length ?? 0,

      items: fullOrder ? [toOrderResponse(fullOrder)] : [],
    };
  }

  async getAll() {
    const items = await this.orderRepository.find({
      relations: ['tickets'],
    });

    return {
      total: items.length,

      items: items.map(toOrderResponse),
    };
  }
}