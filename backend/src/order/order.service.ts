import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { CreateOrderDto } from './dto/order.dto';
import { toOrderResponse } from './mappers/order.mapper';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
  ) {}

 async create(dto: CreateOrderDto) {
  for (const ticket of dto.tickets) {
    const film = await this.filmModel.findOne({ id: ticket.film });

    if (!film) throw new BadRequestException('Film not found');

    const session = film.schedule.find(
      (s) => s.id === ticket.session,
    );

    if (!session) throw new BadRequestException('Session not found');

    const place = `${ticket.row}:${ticket.seat}`;

    if (session.taken.includes(place)) {
      throw new BadRequestException('Seat already taken');
    }

    session.taken.push(place);
    await film.save();
  }

  const order = await this.orderModel.create({
    email: dto.email,
    phone: dto.phone,
    tickets: dto.tickets,
  });

  return {
    total: order.tickets.length,
    items: [toOrderResponse(order)],
  };
}

async getAll() {
  const items = await this.orderModel.find();

  return {
    total: items.length,
    items: items.map(toOrderResponse),
  };
}
}