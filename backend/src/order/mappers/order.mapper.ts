import { OrderResponseDto } from '../dto/orderresponse.dto';

import { TicketResponseDto } from '../dto/ticketresponse.dto';
import { OrderEntity } from '../entities/order.entity';
import { TicketEntity } from '../entities/ticket.entity';

export function toTicketResponse(ticket: TicketEntity): TicketResponseDto {
  return {
    id: ticket.id,

    film: ticket.film,

    session: ticket.session,

    daytime: ticket.daytime,

    row: ticket.row,

    seat: ticket.seat,

    price: ticket.price,
  };
}

export function toOrderResponse(order: OrderEntity): OrderResponseDto {
  return {
    id: order.id,

    email: order.email,

    phone: order.phone,

    tickets: (order.tickets ?? []).map(toTicketResponse),
  };
}