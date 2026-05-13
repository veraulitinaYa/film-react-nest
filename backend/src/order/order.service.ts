import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { Film, FilmDocument } from '../films/schemas/film.schema';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
  ) {}

  async create(dto: CreateOrderDto) {
    const film = await this.filmModel.findOne({ id: dto.film });

    if (!film) {
      throw new BadRequestException('Film not found');
    }

    const session = film.schedule.find(
      (s) => s.id === dto.session,
    );

    if (!session) {
      throw new BadRequestException('Session not found');
    }

    const place = `${dto.row}:${dto.seat}`;

    if (session.taken.includes(place)) {
      throw new BadRequestException('Seat already taken');
    }

    session.taken.push(place);

    await film.save();

    const order = new this.orderModel(dto);
    await order.save();

    return order;
  }

  async getAll() {
    const items = await this.orderModel.find();

    return {
      total: items.length,
      items,
    };
  }
}