import { OrderResponseDto } from '../dto/orderresponse.dto';
import { TicketResponseDto } from '../dto/ticketresponse.dto';

export function toTicketResponse(ticket: any): TicketResponseDto {
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

export function toOrderResponse(order: any): OrderResponseDto {
  return {
    id: order._id.toString(),
    email: order.email,
    phone: order.phone,
    tickets: (order.tickets ?? []).map(toTicketResponse),
  };
}