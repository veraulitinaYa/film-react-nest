import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(dto: CreateOrderDto) {
    return {
      message: 'order created',
      data: dto,
    };
  }
}